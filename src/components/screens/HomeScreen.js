import React, {useContext, useRef, useState} from "react";
import {Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {useIsFocused} from '@react-navigation/native'
import {AuthContext} from "../navigation/AuthProvider";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";
import HomePagePostListView from "./Posts/List/HomePagePostListView";
import getRouteParam from "../helper/getRouteParam";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import API from "../../services/api";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(100000));
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const HomeScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(false);
    const [askComponentToLoadMorePosts, setAskComponentToLoadMorePosts] = useState(1);
    const [postCreatedId, setPostCreatedId] = useState(getRouteParam(route, "postCreatedProp"));
    const [posLoadingFinished, setPosLoadingFinished] = useState(false);
    const [mountingFinished, setMountingFinished] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const isFocused = useIsFocused()

    React.useEffect(() => {
        registerForPushNotificationsAsync().then( async ( token) => {
            if( token !== null || token !== "" ){
                await API.User.setNotificationToken( { device_token : token , device_os : Platform.OS  } );
            }
            setExpoPushToken(token);
        });

        // console.log('Here');
        let isUnMount = false;
        if (!isUnMount) {
            setLoading(false);
            setMountingFinished(true);
        }

        if (
            getRouteParam(route, "postCreatedProp")
        ) {
            // // console.log( "postCreatedProp" , getRouteParam( route , "postCreatedProp" ) );
            // // console.log( "postCreatedIdProp" , getRouteParam( route , "postCreatedIdProp" ) );
            setPostCreatedId(getRouteParam(route, "postCreatedIdProp"));
            if (getRouteParam(route, "postCreatedProp")) {
                let i = askComponentToLoadMorePosts + 1;
                setAskComponentToLoadMorePosts(i);
            }
        }

        return () => {
            isUnMount = true;
        }

    }, [navigation, route.params, isFocused]);

    const loadinIsFinished = React.useCallback(() => {
        // console.log(' Loading is finished ');
        setLoading(false)
    }, []);

    return (
        <View style={styles.container}>
            {
                mountingFinished ?
                    <SafeAreaView style={styles.container}>

                        {/*<View*/}
                        {/*    style={{*/}
                        {/*        flex: 1,*/}
                        {/*        alignItems: 'center',*/}
                        {/*        justifyContent: 'space-around',*/}
                        {/*    }}>*/}
                        {/*    <Text>Your expo push token: {expoPushToken}</Text>*/}
                        {/*    <View style={{ alignItems: 'center', justifyContent: 'center' }}>*/}
                        {/*        <Text>Title: {notification && notification.request.content.title} </Text>*/}
                        {/*        <Text>Body: {notification && notification.request.content.body}</Text>*/}
                        {/*        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>*/}
                        {/*    </View>*/}
                        {/*    <Button*/}
                        {/*        title="Press to schedule a notification"*/}
                        {/*        onPress={async () => {*/}
                        {/*            await schedulePushNotification();*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</View>*/}

                        {/* Help Posts container */}
                        <HomePagePostListView
                            askComponentToLoadMorePostsProp={askComponentToLoadMorePosts}
                            loadinIsFinished={() => {
                                loadinIsFinished()
                            }}
                            postCreatedIdProp={postCreatedId}/>

                    </SafeAreaView>
                    :
                    <Loading/>
            }
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white
    },
});

import React, {useContext, useState} from 'react'
import {Image, Platform, RefreshControl, StyleSheet, Text, View, VirtualizedList} from 'react-native'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import API from "../../services/api"
import postImage from "../../../assets/user-avatar.png";
import {windowHeight, windowWidth} from '../../utils/Dimensions'
import color from '../../colors/colors'
import colors from '../../colors/colors'
import {AuthContext} from "../navigation/AuthProvider";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as Notifications from 'expo-notifications';


const UserActivity = ({navigation}) => {

    const {user, logout} = useContext(AuthContext);

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadNotifications = async () => {
        let N = await API.User.getNotifications()
        if (N !== undefined && N.success) {
            setLoading(false)
            setNotifications(N.data)
        } else if (N !== undefined && !N.success) {
            setLoading(false)
            if (N.tokenExpired) {
                logout();
            }
        }
    }

    //Rerender screen on tab press
    React.useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            loadNotifications();
        }
        return () => {
            isUnMount = true;
        }
    }, [])

    function renderBody() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
        );
    }

    return (
        <VirtualizedList

            ListHeaderComponentStyle={{flex: 1}}
            ListHeaderComponent={renderBody()}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={() => {
                    loadNotifications();
                }}/>
            }

            data={notifications}
            renderItem={({item, index}) => (
                <Item index={index} post={item}/>
            )}
            keyExtractor={item => item.id.toString()}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
        />
    )
}

export default UserActivity

const Item = ({index, post}) => {

    let BGColor = color.white

    if (index % 2 !== 0) {
        BGColor = color.primaryTransparent
    } else {
        BGColor = color.secondaryTransparent
    }

    const getPostCommentImage = (post_comment_type) => {
        switch (post_comment_type) {
            case "LIKE" :
                return (<View style={styles.iconContaner}>
                    <Ionicons style={styles.icon} name={"ios-heart"}
                              size={20} color={colors.primary}/>
                </View>)
            case "SAVE" :
                return (<View style={styles.iconContaner}>
                    <MaterialIcons style={styles.icon} name={"save"}
                                   size={20} color={colors.primary}/>
                </View>)
            case "NOTI_COMMENT" :
                return (<View style={styles.iconContaner}>
                    <MaterialCommunityIcons style={styles.icon} name={"comment"}
                                            size={20} color={colors.primary}/>
                </View>)
            case "REQUEST" :
                return (<View style={styles.iconContaner}>
                    <Ionicons style={styles.icon} name={"ios-send"}
                              size={20} color={colors.primary}/>
                </View>)
            case "ACCEPT" :
                return (<View style={styles.iconContaner}>
                    <Ionicons style={styles.icon} name={"checkmark-circle"}
                              size={20} color={colors.primary}/>
                </View>)
            case "DECLINE" :
                return (<View style={styles.iconContaner}>
                    <FontAwesome5Icon style={styles.icon} name={"times-circle"}
                                      size={20} color={colors.primary}/>
                </View>)
        }
    }

    return (
        <View style={{backgroundColor: BGColor}}>
            <View style={styles.postCard}>
                {post.user.profile_picture
                    ? (<Image source={{uri: post.user.profile_picture}} style={styles.postImage}/>)
                    : (<Image source={postImage} style={styles.postImage}/>)
                }

                {getPostCommentImage(post.post_comment_type)}

                <View style={styles.textContent}>


                    <Text style={styles.textCommentType}>{post.post_comment_type}</Text>
                    <Text>{post.text}</Text>
                    <Text style={{
                        ...styles.textCommentType,
                        textAlign: "left",
                        fontSize: 12,
                        marginTop: 10
                    }}>{moment.unix(post.created_at).fromNow()}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    iconContaner: {
        flex: 1,
        width: 50,
        height: 50,
        position: "relative",
    },

    icon: {

        backgroundColor: "white",
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 10,

        flex: 1,
        width: 40,
        height: 40,
        position: "absolute",
        left: -25,
        top: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    header: {
        paddingBottom: 15,
        height: windowHeight / 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.primary,
        color: '#ffffff',
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    noNotification: {
        paddingTop: 100,
        textAlign: 'center',
        fontSize: 30,
    },
    postCard: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    postImage: {
        width: windowWidth / 6,
        height: windowWidth / 6,
        borderRadius: windowWidth / 12,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    textContent: {
        width: windowWidth / 1.3,
        paddingLeft: 20,
    },
    textCommentType: {
        color: color.primary,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: {data: 'goes here'},
        },
        trigger: {seconds: 2},
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
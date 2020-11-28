import React, {useContext, useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useIsFocused} from '@react-navigation/native'
import {AuthContext} from "../navigation/AuthProvider";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";
import HomePagePostListView from "./Posts/List/HomePagePostListView";
import getRouteParam from "../helper/getRouteParam";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(100000));
}

const HomeScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(false);
    const [askComponentToLoadMorePosts, setAskComponentToLoadMorePosts] = useState(1);
    const [postCreatedId, setPostCreatedId] = useState(getRouteParam(route, "postCreatedProp"));
    const [posLoadingFinished, setPosLoadingFinished] = useState(false);
    const [mountingFinished, setMountingFinished] = useState(false);

    const isFocused = useIsFocused()

    React.useEffect(() => {
        // console.log('Here');
        let isUnMount = false;
        if (!isUnMount) {
            setLoading(false);
        }
        setMountingFinished(true);

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

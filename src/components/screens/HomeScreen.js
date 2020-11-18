import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { useIsFocused } from '@react-navigation/native'
import API from "../../services/api";
import {AuthContext} from "../navigation/AuthProvider";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";
import PostViewHome from "./Posts/View/PostViewHome";
import {windowWidth} from "../../utils/Dimensions";

import HomePageTopSlider from "../helper/HomePageTopSlider/HomePageTopSlider";
import HomePagePostListView from "./Posts/List/HomePagePostListView";

import TopHelper from "../screens/partials/home/TopHelpers"
import Ionicons from "react-native-vector-icons/Ionicons";
import getRouteParam from "../helper/getRouteParam";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(100000));
}

const HomeScreen = ({ navigation , route }) => {
    const {user, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState( false );
    const [askComponentToLoadMorePosts, setAskComponentToLoadMorePosts] = useState( 1 );
    const [postCreatedId, setPostCreatedId ] = useState( getRouteParam( route , "postCreatedProp" )  );
    const [posLoadingFinished, setPosLoadingFinished] = useState( false );
    const [mountingFinished, setMountingFinished] = useState( false );

    const isFocused = useIsFocused()

    React.useEffect(() => {
        // console.log('Here');
        let isUnMount = false;
        if (!isUnMount){
            setLoading( false );

            // setInterval(() => {
            //     let i = askComponentToLoadMorePosts+1;
            //     setAskComponentToLoadMorePosts(  i  );
            // } , 60000 );

        }
        setMountingFinished( true );

        if(
            getRouteParam( route , "postCreatedProp" )
        ){
            // console.log( "postCreatedProp" , getRouteParam( route , "postCreatedProp" ) );
            // console.log( "postCreatedIdProp" , getRouteParam( route , "postCreatedIdProp" ) );
            setPostCreatedId( getRouteParam( route , "postCreatedIdProp" ) );
            if(  getRouteParam( route , "postCreatedProp" )  ){
                let i = askComponentToLoadMorePosts+1;
                setAskComponentToLoadMorePosts( i );
            }
        }
        return () => {
            isUnMount = true;
        }
    } , [ navigation , route.params , isFocused ] );
    
    const loadinIsFinished = React.useCallback(() => {
        // console.log(' Loading is finished ');
        setLoading( false )
    }, []);
    
    return (
        <View style={styles.container} >
            {
                mountingFinished ?
                    <ScrollView style={styles.container}
                                refreshControl={
                                    <RefreshControl refreshing={isLoading} onRefresh={()=>{
                                        setLoading( true );
                                        let i = askComponentToLoadMorePosts+1;
                                        setAskComponentToLoadMorePosts(  i  );
                                    }} />
                                }
                    >
                        {/* Slider container */}
                        <HomePageTopSlider navigation={navigation} />

                        {/* Top Helper container */}
                        <TopHelper />

                        {/* Help Posts container */}
                        <HomePagePostListView
                            askComponentToLoadMorePostsProp={askComponentToLoadMorePosts}
                            loadinIsFinished={()=>{ loadinIsFinished() }}
                            postCreatedIdProp={postCreatedId} />

                    </ScrollView>
                    :
                    <Loading />
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

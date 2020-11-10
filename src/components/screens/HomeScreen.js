import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import API from "../../services/api";
import {AuthContext} from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";
import PostViewHome from "./Posts/View/PostViewHome";
import {windowWidth} from "../../utils/Dimensions";
import HomePageTopSlider from "../helper/HomePageTopSlider/HomePageTopSlider";


const HomeScreen = () => {
    const {user, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = async () => {
        let postsData = await API.Post.list();
        if (postsData !== undefined && postsData.success ) {
            setLoading(false)
            setPosts(postsData.data)
            return true;
        }else if( postsData !== undefined && !postsData.success ){
            if( postsData.tokenExpired ){
                logout();
            }
        }
    }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount){
            loadPost();
        }
        return () => {
            isUnMount = true;
        }
    }, []);

    return (
        <ScrollView style={styles.container}  >

            {/* Slider container */}
            <HomePageTopSlider />

            {/* Top Helper container */}
            <View style={{ height: 100 }}>
                {/*<Text>Top Helper's</Text>*/}
            </View>

            {/* Help Posts container */}

                {/*<Text style={{fontSize: 30, marginVertical: 10, borderTopWidth: 1, }}>Help Seeker's</Text>*/}


            <View>
                {
                    isLoading
                    ?
                    <Loading />
                    :
                    (
                        <ScrollView>
                            {
                                Array.isArray(posts) && posts.map( function( post , index ) {
                                    return(
                                        <PostViewHome dataKey={index} key={index} dataProp={post}></PostViewHome>
                                        )
                                })
                            }
                        </ScrollView>
                    )
                }
            </View>

        </ScrollView>
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

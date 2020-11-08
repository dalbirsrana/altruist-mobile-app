import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import API from "../../services/api";
import {AuthContext} from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";
import PostViewHome from "./Posts/View/PostViewHome";
import {windowWidth} from "../../utils/Dimensions";
import FlatListSlider from "../helper/Slider/FlatListSlider";


const HomeScreen = () => {
    const {user} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = async () => {
        let P = await API.Post.list();
        if (P !== undefined ) {
            setLoading(false)
            setPosts(P.data)
            console.log(P.data)
            return true;
        }
    }


    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount){
            loadPost();

            // setInterval( () => {
            //     loadPost();
            // } , 60000 );

        }
        return () => {
            isUnMount = true;
        }
    }, []);


    let images = [
        {
            image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            desc: '1',
        },
        {
            image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
            desc: '2',
        },
        {
            image:'https://images.unsplash.com/photo-1465572089651-8fde36c892dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
            desc: '3',
        },
        {
            image:'https://images.unsplash.com/photo-1533299346856-b1a85808f2ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
            desc: '4',
        },
        {
            image:'https://images.unsplash.com/photo-1589011352120-510c9fca6d31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
            desc: '5',
        },
    ] ;

    const screenWidth = Math.round(windowWidth);
    return (
        <ScrollView style={styles.container}>

            {/* Slider container */}
            <View style={{ height: 250 }}>

                <FlatListSlider
                    data={images}
                    timer={100}
                    imageKey={'image'}
                    local={false}
                    width={screenWidth}
                    separator={0}
                    loop={false}
                    autoscroll={false}
                    currentIndexCallback={index => console.log('Index', index)}
                    indicator
                    animation
                />

                <Button title="Looking for help" color="black" accessibilityLabel="looking for help in your area" />

            </View>

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
                                        <PostViewHome key={index} dataProp={post}></PostViewHome>
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

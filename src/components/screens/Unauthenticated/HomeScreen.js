import React, {useContext , useState, useEffect } from "react";
import {Image, StyleSheet, Text, View, TouchableHighlight} from "react-native";

import API from "../../../services/api";

import colors from "../../../colors/colors";
import logo from "../../../../assets/icon.png";
import Loading from "../../../common/Loading";


// const DisplayPosts = (props, {navigation}) => (

// )

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = async () => {
        let p = await API.Post.list();
        if (p !== undefined ) {
            setLoading(false)
            setPosts(p.data)
            console.log(p.data)
            return true;
        }
    }

    useEffect( ()=> {
        let isUnMount = false;
        if (!isUnMount){
            loadPost();
        }
        return () => {
            isUnMount = true;
        }
    }, []);


    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 200, height: 200}}/>

                <Text style={styles.heading}>
                    Home Page
                </Text>

                { isLoading ? <Loading /> : (
                    posts.map( post => (
                        <TouchableHighlight underlayColor="white" key={post.id} onPress={ ()=> navigation.navigate("SignIn") }>
                            <View>
                                <Text style={styles.h2}>{post.title}</Text>
                                <Image source={post.s3_path} style={{width: 200, height: 200}} />
                            </View>
                        </TouchableHighlight>
                        ))
                    ) 
                }
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    h2: {
        fontSize: 26,
        color: "blue",
        textAlign: "center",
        marginVertical: 20,
    },
    heading: {
        fontSize: 32,
        textAlign: "center",
        color: "green",
        marginVertical: 25,
    },
});

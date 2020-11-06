import React, {useState, useEffect } from "react";
import {Image, StyleSheet, Text, Button, View, TouchableHighlight} from "react-native";

import API from "../../../services/api";
 
import colors from "../../../colors/colors";
import logo from "../../../../assets/icon.png";
import Loading from "../../../common/Loading";

import { ScrollView } from "react-native-gesture-handler";


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

            {/* Slider container */}
            <View style={{ height: 250 }}>
                <Image source={logo} style={{width: 200, height: 200}}/>
                <Button title="Looking for help" color="black" accessibilityLabel="looking for help in your area" />
            </View>

            {/* Top Helper container */}
            <View style={{ height: 300 }}>
                <Text>Top Helper's</Text>
            </View>

            {/* Help Posts container */}
            <View>
                <Text style={{fontSize: 30, marginVertical: 10, borderTopWidth: 1, }}>Help Seeker's</Text>
            </View>

            <View style={{height: 300}}>
            <ScrollView>
                { isLoading ? <Loading /> : (
                    posts.map( post => (
                        <TouchableHighlight underlayColor="white" key={post.id} onPress={ ()=> navigation.navigate("SignIn") }>
                            <View style={{height: 200}}>
                                <Text style={styles.h2}>{post.title}</Text>
                                <Image source={{uri:post.s3_path}} style={{ width: 150, height: 150 }} />
                            </View>
                        </TouchableHighlight>
                        ))
                    )
                }
            </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "stretch",
        justifyContent: "flex-start",
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

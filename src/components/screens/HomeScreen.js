import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import API from "../../services/api";
import FormButton from "../../common/FormButton";
import {AuthContext} from "../navigation/AuthProvider";

import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";

// import FormButton from "../../common/FormButton";
// import InverseButton from "../../common/InverseButton";
// import {windowHeight, windowWidth} from "../../utils/Dimensions";
// import FormButtonSmall from "../../common/FormButtonSmall";

// import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";

import Swiper from 'react-native-swiper';
import BR from "../helper/BR";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import AsyncStorageHelper from "./../../services/AsyncStorageHelper";
import InverseButton from "../../common/InverseButton";
import {windowHeight, windowWidth} from "../../utils/Dimensions";
import FormButtonSmall from "../../common/FormButtonSmall";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FlatListSlider from './../helper/Slider/FlatListSlider';


const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);

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


    // const isUserSignedOut = () => {
    //     return  typeof user === "undefined" || ( typeof user !== "undefined" && user.isSignout === true );
    // }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount){
            loadPost();
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

    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <View style={styles.container}>

            {/* Slider container */}
            <View style={{ height: 250 }}>
                <Image source={logo} style={{width: 200, height: 200}}/>
                <Button title="Looking for help" color="black" accessibilityLabel="looking for help in your area" />

            </View>

            {/* Top Helper container */}
            <View style={{ height: 100 }}>
                <Text>Top Helper's</Text>

            </View>

            {/* Help Posts container */}

                <Text style={{fontSize: 30, marginVertical: 10, borderTopWidth: 1, }}>Help Seeker's</Text>
                <ScrollView>
                {
                    isLoading
                    ?
                    <Loading />
                    :
                    (<> {
                        posts.map(post => (

                            <TouchableOpacity underlayColor="white" key={post.id} onPress={ ()=> navigation.navigate("SingleHelpScreen") }>

                                <Text style={styles.h2}>{post.title}</Text>
                                <Image source={post.s3_path} style={{width: 200, height: 200}} />

                            </TouchableOpacity>

                        )) }
                    </>
                    )
                }
            </ScrollView>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "stretch",
        justifyContent: "space-evenly",
    },
});

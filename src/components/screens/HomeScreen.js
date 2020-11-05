import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity, Dimensions} from "react-native";
import FormButton from "../../common/FormButton";
import {AuthContext} from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
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
    const {user, logout} = useContext(AuthContext);

    const isUserSignedOut = () => {
        return  typeof user === "undefined" || ( typeof user !== "undefined" && user.isSignout === true );
    }

    useEffect(() => {
        if( isUserSignedOut() ){
           return navigation.navigate("SignIn");
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

            <Image source={logo} style={{width: 200, height: 200}} />


                <Text>
                    { user.isSignout ? "true" : "false" }
                    Welcome {user.firstName} {user.lastName}
                </Text>

            <FormButton buttonTitle='LogOut' onPress={() => logout()}/>



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
    para: {
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        textAlign: "center",
        marginVertical: 30,
    },
});

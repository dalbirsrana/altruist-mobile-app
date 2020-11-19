import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import PostCategorySelection from "./PostCategorySelection";
import PostTypeSelection from "./PostTypeSelection";
import PostDataForm from "./PostDataForm";
import {useIsFocused} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import getRouteParam from "../../../helper/getRouteParam";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";

const Create = ({ route, navigation}) => {

    const [homeBtn,setHomeBut] = useState("");

    React.useEffect(() => {

        if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params === "undefined" ){
             console.log('Move to home');
             console.log( "homeBtn" ,homeBtn );
             navigation.navigate( 'HomeStack', { screen : 'Home' , params: route.params }  );
        }else if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
            getRouteParam( navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params , 'postCreatedIdProp' ) ===
            getRouteParam( route , 'postCreatedIdProp' )
        ){
            console.log('Move to Create');
            return navigation.navigate( 'PostTypeSelection' );
        }else if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
            getRouteParam( navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params , 'postCreatedIdProp' ) !==
            getRouteParam( route , 'postCreatedIdProp' )
        ){
            console.log( "homeBtn" , homeBtn );
            console.log('Move to home');
            return navigation.navigate( 'HomeStack', { screen : 'Home' , params: route.params }  );
        }

    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Text/>,
            headerLeft: () => <Text/>,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity  style={styles.button} onPress={() => {
                navigation.navigate( 'HomeStack', { screen : 'Home' , params: route.params }  )
            } } >
                <Text  style={styles.buttonText} ref={input => setHomeBut(input)} >Go Home</Text>
            </TouchableOpacity>

            <TouchableOpacity   style={styles.button} onPress={() => {
                navigation.navigate( 'PostTypeSelection', {}  )
            } } ref={input => setHomeBut(input)} >
                <Text style={styles.buttonText} >Create New Post</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Create;

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
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,
        width: windowWidth / 1.5,
        height: windowHeight / 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
    },
});

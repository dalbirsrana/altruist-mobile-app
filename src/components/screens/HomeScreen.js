import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../common/FormButton";
import {AuthContext} from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import BR from "../helper/BR";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import AsyncStorageHelper from "./../../services/AsyncStorageHelper";
import InverseButton from "../../common/InverseButton";
import {windowHeight, windowWidth} from "../../utils/Dimensions";
import FormButtonSmall from "../../common/FormButtonSmall";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

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

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 200, height: 200}} />


                <Text>
                    { user.isSignout ? "true" : "false" }
                    Welcome {user.firstName} {user.lastName}
                </Text>

 <FormButton buttonTitle='LogOut' onPress={() => logout()}/>


            <FileUploadExampleScreen  />

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

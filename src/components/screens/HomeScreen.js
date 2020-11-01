import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View} from "react-native";
import FormButton from "../../common/FormButton";
import {AuthContext} from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import BR from "../helper/BR";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import AsyncStorageHelper from "./../../services/AsyncStorageHelper";

const HomeScreen = ({navigation}) => {
    const {user, logout} = useContext(AuthContext);

    const isUserSignedOut = () => {
        return  typeof user === "undefined" || ( typeof user !== "undefined" && user.isSignout === true );
    }

    useEffect(() => {
        if( isUserSignedOut() ){
            navigation.navigate("SignIn");
        }
    });

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 200, height: 200}} />


                <Text>
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

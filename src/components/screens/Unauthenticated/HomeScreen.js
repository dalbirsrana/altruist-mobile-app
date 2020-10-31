import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View} from "react-native";
import colors from "../../../colors/colors";


const HomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 200, height: 200}}/>

                <Text>
                    UnAuthenticated
                </Text>


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

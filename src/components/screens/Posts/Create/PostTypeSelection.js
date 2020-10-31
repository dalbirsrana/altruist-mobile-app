import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";


const PostTypeSelection = ({navigation, selection}) => {
    
    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 300, height: 300, marginBottom: 60 }}/>

            <TouchableOpacity
                style={styles.button}
                onPress={() => selection( 1 )}
            >
                <Text style={styles.buttonText}>I want to help.</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => selection( 2 )}
            >
                <Text style={styles.buttonText}>I need a help.</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PostTypeSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
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

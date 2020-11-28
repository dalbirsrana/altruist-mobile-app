import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../colors/colors";
import {windowWidth} from "../utils/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export default function InverseButton({buttonTitle, iconName, ...rest}) {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.buttonContainer} {...rest}>
                {iconName === "cog" ?
                    <ActivityIndicator style={styles.iconStyle} color={colors.primary}/>
                    : null
                }
                {iconName !== "cog" ?
                    <MaterialIcons style={styles.iconStyle} color={colors.primary} name={iconName} size={18}/>
                    : null
                }
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginLeft: 0,
        marginTop: 0,
        width: windowWidth,
        display: "flex",
        minWidth: "100%"
    },
    iconStyle: {
        fontSize: 20,
        marginLeft: 10,
    },
    iconStyleRotate: {
        fontSize: 20,
        marginLeft: 10,
        transform: [{rotateY: '180deg'}]
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 10,
        marginTop: 10,
        marginLeft: 20,
        fontSize: 16,
        borderColor: colors.primary,
        borderWidth: 1,
        color: colors.primary,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        textAlign: "center",
        alignSelf: "center"
    },
    buttonText: {
        paddingLeft: 10,
        paddingRight: 20,
        fontSize: 16,
        color: colors.primary,
        flexWrap: 'nowrap',
        textAlign: "center",
    },
});

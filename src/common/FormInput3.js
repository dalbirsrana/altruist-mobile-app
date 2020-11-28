import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import colors from "../colors/colors";
import {windowWidth} from "../utils/Dimensions";

export default function FormInput2({labelValue, placeholderText, error = "", ...rest}) {
    return (
        <View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
        padding: 12,
        width: windowWidth / 1.4,
        fontSize: 16,
        borderRadius: 6,
        borderColor: colors.black,
        borderWidth: 1,
    },
});

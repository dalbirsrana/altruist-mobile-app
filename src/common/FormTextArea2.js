import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormInput({ labelValue, placeholderText, error, ...rest }) {
  return (
      <View>
        <TextInput
            value={labelValue}
            style={styles.input}
            numberOfLines={4}
            placeholder={placeholderText}
            placeholderTextColor="#666"
            {...rest}
        />

      </View>
  );
}

const styles = StyleSheet.create({

  input: {
marginBottom:20,
    height:100,
     textAlignVertical: 'top',
    width: windowWidth-140,
    fontSize: 16,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
    display:"flex",
    alignContent:'flex-start'
  },
});

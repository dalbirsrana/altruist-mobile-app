import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor="#666"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 6,
    marginBottom: 15,
    width: windowWidth / 1.5,
    height: windowHeight / 18,
    fontSize: 16,
    borderRadius: 6,
    borderColor: colors.black,
    borderWidth: 1,
  },
});

import React from "react";
import { StyleSheet, TextInput , View , Text } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormInput2({ labelValue, placeholderText, error = "" , ...rest }) {
  return (
      <View >
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
    margin:0,
    padding: 15,
    width: windowWidth-140,
    fontSize: 16,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
  },
});

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
            numberOfLines={2}
            placeholder={placeholderText}
            placeholderTextColor="#666"
            {...rest}
        />
        { error !== "" ?
            <Text style={styles.errorLabel} >{error}</Text>
            : null
        }
      </View>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    width: windowWidth-40,
    height: 100,
    margin:10,
    marginLeft:20,
    marginRight:20,
    fontSize: 16,
    color: "rgb(232, 155, 141)",
    textAlign: "left"
  },
  input: {
    padding: 10,
    height:100,
    textAlignVertical: 'top',
    marginLeft: 20 ,
    marginTop: 10 ,
    marginBottom: 10,
    width: windowWidth-40,
    fontSize: 16,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
    display:"flex",
    alignContent:'flex-start'
  },
});

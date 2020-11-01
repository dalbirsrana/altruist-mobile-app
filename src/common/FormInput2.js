import React from "react";
import { StyleSheet, TextInput , View , Text } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormInput2({ labelValue, placeholderText, error = "" , ...rest }) {
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
    height: "fit-content",
    margin:10,
    marginLeft:20,
    marginRight:20,
    fontSize: 16,
    color: "rgb(232, 155, 141)",
    textAlign: "left"
  },
  input: {
    padding: 15,
    marginBottom: 10,
    marginLeft: 20 ,
    marginTop: 20 ,
    width: windowWidth-40,
    fontSize: 16,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
  },
});
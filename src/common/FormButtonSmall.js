import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormButtonSmall({ buttonTitle, align, ...rest }) {

  let justifyContent = "flex-end" ;
  if( align === "center" ){
    justifyContent = align;
  }else if( align === "left" ){
    justifyContent =  "flex-start";
  }

  const styles = StyleSheet.create({
    buttonTopContainer: {
      width: windowWidth-40,
      marginTop:10,
      marginBottom:10,
      marginLeft:20,
      marginRight:20,
      display:"flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-end",
      justifyContent: justifyContent,
      borderRadius: 8,
    },
    buttonContainer: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
      textAlign: "center",
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 20,
      color: colors.white,
      fontWeight: "bold"
    },
  });


  return (
    <View  style={styles.buttonTopContainer}  >
      <TouchableOpacity style={styles.buttonContainer} {...rest} >
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

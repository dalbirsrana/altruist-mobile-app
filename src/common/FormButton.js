import React, {useState} from "react";
import { StyleSheet, TouchableOpacity, Text , ActivityIndicator } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormButton({ buttonTitle, loadingProp , ...rest }) {

  const [loading, setLoading] = useState(  typeof loadingProp !== "undefined" ? loadingProp : false );

  console.log( "loadingProp" , loadingProp )

  return (
    <TouchableOpacity style={{ ...styles.buttonContainer , opacity: loading ? 0.7 : 1 }} {...rest}>
      {
          loading ?
              <ActivityIndicator />
              : null
      }
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
});

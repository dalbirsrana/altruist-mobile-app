import React, {useState, useEffect} from "react";
import { StyleSheet, TouchableOpacity, Text , ActivityIndicator } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export default function FormButton({ buttonTitle, loadingProp , ...rest }) {

  const [loading, setLoading] = useState(  typeof loadingProp !== "undefined" ? loadingProp : false );

  useEffect(() => {

    let isUnMount = false;
    if (!isUnMount) {
      setLoading( loadingProp );
    }
    setLoading( loadingProp );
    return () => {
      isUnMount = true;
    }

  } , [loadingProp] )

  return (
    <TouchableOpacity style={{ ...styles.buttonContainer , opacity: loading ? 0.5 : 1 }} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}{
        loading ?
            "..."
            : null
      }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display:"flex",
    marginBottom: 25,
    width: windowWidth / 1.5,
    height: windowHeight / 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
});

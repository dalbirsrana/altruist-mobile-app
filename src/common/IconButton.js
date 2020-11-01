import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../colors/colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function IconButton({ name = "arrow-back-circle", size = "12", type = "ionic", ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      { type === "material" ? <MaterialIcons name={{name}} size={{size}}  /> : null }
      { type === "ionic" ? <Ionicons name={{name}} size={{size}}  /> : null }
      { type === "ant" ? <AntDesign name={{name}} size={{size}}  /> : null }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 70,
    backgroundColor: colors.primary,
  }
});

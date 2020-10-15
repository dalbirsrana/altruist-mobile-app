import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

class Loading extends React.Component {
  render = () => (
    <View style={Styles.section_content}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

export default Loading;

//styles
const Styles = StyleSheet.create({
    section_content: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
    }
  });
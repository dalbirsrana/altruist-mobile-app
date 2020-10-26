import React, { useContext, useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../common/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import BR from "../helper/BR";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import AsyncStorageHelper from "./../../services/AsyncStorageHelper";
import { windowHeight } from "../../utils/Dimensions";
import { StatusBar } from "expo-status-bar";
import { Platform } from 'react-native';
import Slider from './partials/home/Slider';
const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const isGuestUser = () => {
    return typeof user === "undefined";
  };

  const alertItem = async function () {
    let valueSaved = await AsyncStorageHelper.getMyObject("home");
    console.log(valueSaved);
  };

  return (
    <View style={styles.container}>
<Slider/>

        <Image source={logo} style={{ width: 100, height: 100 }} />

        {isGuestUser() ? null : <Text>Welcome {user.userName} </Text>}

        <FormButton buttonTitle="LogOut" onPress={() => logout()} />
      <TouchableOpacity onPress={() => navigation.navigate("UpdateUserProfileScreen")}>
        <Text style={styles.forgot}>Update profile</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.windowHeight : 0,
    backgroundColor: colors.white,
  },
  innercontainer1: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.windowHeight : 0,
    position: "relative",
    backgroundColor: "blue",
    //
  },
  innercontainer2: {
    flex: 1,
    backgroundColor: "pink",
    flexDirection: "row",
  },
  innercontainer3: {
    flex: 1,
    backgroundColor: "yellow",
    flexDirection: "row",
  },
  para: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    textAlign: "center",
    marginVertical: 30,
  },
  // FormButton: {
  //   position: "absolute",
  //   zIndex: 1,
  //   paddingTop: 20,
  // },
});

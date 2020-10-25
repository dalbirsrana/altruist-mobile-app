import React, { useContext } from "react";
import { Image, Button, StyleSheet, Text, View } from "react-native";
import FormButton from "../../common/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import BR from "../helper/BR";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import AsyncStorageHelper from "./../../services/AsyncStorageHelper";
import AsyncStorage from "@react-native-community/async-storage";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

    const alertItem = async function () {
        let valueSaved = await AsyncStorageHelper.getMyObject('home');
        console.log( valueSaved );
    }

    return (
        <View style={styles.container}>
                <Image source={logo} style={{width: 300, height: 80}} />
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 300, height: 80 }} />

      <Text>Welcome {user.name} </Text>

      <FormButton buttonTitle="LogOut" onPress={() => logout()} />

      <Button title="Open Drawer" onPress={() => navigation.navigate("Test")} />

      <Text style={styles.para}>This is home page</Text>
    </View>
  );
};
                <FormButton buttonTitle='LogOut' onPress={() => logout()} />

            <Button
                title="Alert Asyncstorage"
                onPress={() => alertItem()}
            />

                <Button
                title="Open Drawer"
                onPress={() => navigation.navigate('Test')}
                />

                <BR/>

                <FileUploadExampleScreen location={"home"} />

                <BR/>


                <Text style={styles.para}>
                    This is home page
                </Text>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  para: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    textAlign: "center",
    marginVertical: 30,
  },
});

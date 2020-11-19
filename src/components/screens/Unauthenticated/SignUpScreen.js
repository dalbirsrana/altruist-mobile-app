import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import colors from "../../../colors/colors";
import logo from "../../../../assets/icon.png";

import FormButton from "../../../common/FormButton";
import FormInput from "../../../common/FormInput";
import { AuthContext } from "../../navigation/AuthProvider";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(AuthContext);

  const [signUpSuccess, setSignUpSuccess] = useState(undefined);
  const [signUpData, setSignUpData] = useState([]);

  const signUp = async() => {

    const data = {
      firstName: firstName,
      lastName: lastName,
      username: email,
      password: password,
    };

    let signUpQuery = await register(data);

    if (signUpQuery !== undefined && signUpQuery.success) {
      navigation.navigate("SignIn");
    } else if (signUpQuery.success === false) {
      
      setSignUpSuccess(false)
      setSignUpData(signUpQuery.data)

      console.log(signUpQuery.data);
    }
  }

  const emailTrim = () => {
    let e = signUpData.email[0]
      return e.substring(0, 62)
  }

  return (
    <View style={styles.container}>
        <Image
            source={logo}
            style={styles.logo}
        />


      <Text style={styles.heading}>Find and Give Help Fast</Text>


      {/* error messages  */}
      <Text style={styles.errorMsg}>{
        signUpSuccess === false &&  signUpData.firstName !== undefined ? (signUpData.firstName) : ('')
      }</Text>
      <FormInput
        value={firstName}
        placeholderText="First Name"
        onChangeText={(userFirstName) => setFirstName(userFirstName)}
        autoCapitalize="none"
        keyboardType="first-name"
        autoCorrect={false}
      />
            {/* error messages  */}
      <Text style={styles.errorMsg}>{
        signUpSuccess === false &&  signUpData.lastName !== undefined ? (signUpData.lastName) : ('')
      }</Text>
      <FormInput
        value={lastName}
        placeholderText="Last Name"
        onChangeText={(userLastName) => setLastName(userLastName)}
        autoCapitalize="none"
        keyboardType="last-name"
        autoCorrect={false}
      />
            {/* error messages  */}
      <Text style={styles.errorMsg}>{
        signUpSuccess === false &&  signUpData.email !== undefined ? ( emailTrim() ) : ('')
      }</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
            {/* error messages  */}
      <Text style={styles.errorMsg}>{
        signUpSuccess === false &&  signUpData.password !== undefined ? (signUpData.password) : ('')
      }</Text>
      <FormInput
        value={password}
        placeholderText="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Create an account"
        onPress={ ()=> signUp() }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
  },
  logo: {
    height: 150,
    width: 150,
    marginTop: 20,
  },
  errorMsg: {
    fontSize: 12,
    color: "red",
    marginBottom: 4,
  },
});

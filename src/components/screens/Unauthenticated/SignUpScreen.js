import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../colors/colors";
import FormButton from "../../../common/FormButton";
import FormInput from "../../../common/FormInput";
import { AuthContext } from "../../navigation/AuthProvider";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* error messages  */}
      <Text style={styles.errorMsg}>{msg}</Text>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        value={firstName}
        placeholderText="First Name"
        onChangeText={(userFirstName) => setFirstName(userFirstName)}
        autoCapitalize="none"
        keyboardType="first-name"
        autoCorrect={false}
      />
      <FormInput
        value={lastName}
        placeholderText="Last Name"
        onChangeText={(userLastName) => setLastName(userLastName)}
        autoCapitalize="none"
        keyboardType="last-name"
        autoCorrect={false}
      />
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Signup"
        onPress={async () => {
          const data = {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password: password,
          };

          let signUp = await register(data);

          if (signUp.success) {
            setMsg(
              `Sign Up Success with user ID: ${signUp.data.id} \nRedirecting to login page...`
            );

            navigation.navigate("SignIn");
          } else {
            setMsg(
              `SignUp failed: \n${signUp.data.email} \n${signUp.data.firstName} \n${signUp.data.lastName} \n${signUp.data.password} \n${signUp.data.username}`
            );
            console.log(signUp.data);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  errorMsg: {
    fontSize: 16,
    color: "red",
    marginVertical: 10,
  },
});

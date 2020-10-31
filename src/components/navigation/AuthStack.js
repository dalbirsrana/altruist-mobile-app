import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ResetPassword from "../screens/ResetPassword";
import HomeTabs from "./HomeTabs";
import UnauthenticatedHomeScreen from "./../screens/Unauthenticated/HomeScreen";
import VerifyAccount from "../screens/Unauthenticated/VerifyAccount";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ header: () => null }}
        />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ header: () => null }} />
        <Stack.Screen name="UnauthenticatedHomeScreen" component={UnauthenticatedHomeScreen} options={{ header: () => null }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="VerifyAccount"  options={{ headerTitle: "Verify Account" }} component={VerifyAccount} />
      <Stack.Screen name="ResetPassword" options={{ headerTitle: "Reset Password Step 1" }} component={ResetPassword} />
    </Stack.Navigator>
  );
}

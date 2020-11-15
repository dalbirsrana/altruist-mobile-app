import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/Unauthenticated/SignUpScreen";
import SignInScreen from "../screens/Unauthenticated/SignInScreen";
import ResetPassword from "../screens/Unauthenticated/ResetPassword";
import UnauthenticatedHomeScreen from "./../screens/Unauthenticated/HomeScreen";
import VerifyAccount from "../screens/Unauthenticated/VerifyAccount";

import HomeTabs from "./HomeTabs";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ header: () => null }} />

        <Stack.Screen name="UnauthenticatedHomeScreen" component={UnauthenticatedHomeScreen} options={{ header: () => null }} />
        
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
        <Stack.Screen name="VerifyAccount"  options={{ headerTitle: "Verify Account" }} component={VerifyAccount} />
        
        <Stack.Screen name="ResetPassword" options={{ headerTitle: "Reset Password" }} component={ResetPassword} />

        <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
}

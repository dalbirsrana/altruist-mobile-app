import React from "react";
import LoginScreen from "./src/components/screens/LoginScreen"
import HomeScreen from "./src/components/screens/HomeScreen";
import TestScreen from "./src/components/screens/TestScreen";

// import CustomDrawerContent from "./src/components/DrawerNav";

import { NavigationContainer } from "@react-navigation/native";

// import { createDrawerNavigator } from "@react-navigation/drawer";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

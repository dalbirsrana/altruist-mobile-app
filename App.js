import React from "react";
import HomeScreen from "./components/screens/HomeScreen";
import TestScreen from "./components/screens/TestScreen";

import CustomDrawerContent from "./components/navigation/DrawerNav";

import { NavigationContainer } from "@react-navigation/native";
// NavigationContainer is a component which manages our navigation tree and contains the navigation state. This component must wrap all navigators structure. Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();



export default function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Screen" component={TestScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

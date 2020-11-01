import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTabs from './HomeTabs'
import AuthStack from './AuthStack'
import SignInScreen from "../screens/Unauthenticated/SignInScreen";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>

        <Stack.Screen name='HomeTabs' component={HomeTabs}  options={{ headerShown: false }} />

        <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ header: () => null }}
        />

    </Stack.Navigator>
  );
}

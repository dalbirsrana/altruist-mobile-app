import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
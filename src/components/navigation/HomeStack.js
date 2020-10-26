import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import TestScreen from '../screens/TestScreen'
import FileUploadExampleScreen from '../screens/FileUploadExampleScreen'

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen}  options={{ header: () => null }} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="FileUploadExampleScreen" component={FileUploadExampleScreen} />
    </Stack.Navigator>
  );
}

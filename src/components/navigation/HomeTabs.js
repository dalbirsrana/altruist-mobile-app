import React from 'react'
import { Image } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen'
import HelpScreen from '../screens/SingleHelpScreen'

import UserProfileScreen from '../screens/UserProfileScreen'
import UserPostsScreen from '../screens/UserPostsScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'
import UserActivityScreen from '../screens/UserActivityScreen'
import UserPostHelpScreen from '../screens/UserPostHelpScreen'
import FileUploadExampleScreen from '../screens/FileUploadExampleScreen'

import HomeIcon from '../../../assets/icons_png/Icons_Altruist_Home.png'


const HomeStack = createStackNavigator();

function HomeStackScreens() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen}  options={{ header: () => null }} />
            <HomeStack.Screen name="SingleHelpScreen" component={HelpScreen} />
        </HomeStack.Navigator>
    )
}

const UserProfileStack = createStackNavigator();

function UserProfileScreens() {
    return (
        <UserProfileStack.Navigator>
            <UserProfileStack.Screen name="UserProfile" component={UserProfileScreen} />
            <UserProfileStack.Screen name="UserPosts" component={UserPostsScreen} />
            <UserProfileStack.Screen name="UserSettings" component={UserSettingsScreen} />
        </UserProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function homeTabs() {
    return (
    <Tab.Navigator
        tabBarOptions={
            {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showIcon: true,
            }
        }
    >
        <Tab.Screen name='HomeStack' component={HomeStackScreens}  options={{ 
            header: () => null, 
            tabBarIcon: () => (<Image source={HomeIcon} style={{ width: 30, height: 30 }} />), 
            tabBarLabel: 'Home' }} 
        />
        <Tab.Screen name='UserProfileStack' component={UserProfileScreens} />
        <Tab.Screen name='Notifications' component={UserActivityScreen} />
        <Tab.Screen name='UserPostHelp' component={UserPostHelpScreen} />
        <Tab.Screen name="FileUploadExampleScreen" component={FileUploadExampleScreen} />        
    </Tab.Navigator>
    );
}
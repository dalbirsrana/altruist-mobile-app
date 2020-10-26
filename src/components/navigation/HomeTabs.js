import React from 'react'
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



const HelpStack = createStackNavigator();

function HelpStackScreens() {
    return (
        <HelpStack.Navigator>
            <HelpStack.Screen name="Home" component={HomeScreen}  options={{ header: () => null }} />
            <HelpStack.Screen name="SingleHelpScreen" component={HelpScreen} />
        </HelpStack.Navigator>
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
    <Tab.Navigator>
        <Tab.Screen name='HomeStack' component={HelpStackScreens}  options={{ header: () => null }} />
        <Tab.Screen name='UserProfileStack' component={UserProfileScreens} />
        <Tab.Screen name='Notifications' component={UserActivityScreen} />
        <Tab.Screen name='UserPostHelp' component={UserPostHelpScreen} />
        <Tab.Screen name="FileUploadExampleScreen" component={FileUploadExampleScreen} />        
    </Tab.Navigator>
    );
}
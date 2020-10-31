import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen'
import HelpScreen from '../screens/SingleHelpScreen'

import UserProfileScreen from '../screens/UserProfileScreen'
import UserPostsScreen from '../screens/UserPostsScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'
import UserActivityScreen from '../screens/UserActivityScreen'
import UserPostHelpScreen from '../screens/UserPostHelpScreen'
import FileUploadExampleScreen from '../screens/FileUploadExampleScreen'


import CreatePost from '../screens/Posts/Create/Create'



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
    <Tab.Navigator


        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') {
                    if( focused ){
                        return <Ionicons name='ios-home' size={size} color={color} />;
                    }else{
                        return <AntDesign name="home" size={size} color={color} />;
                    }
                } else if (route.name === 'Chat') {
                    iconName = focused ? 'wechat' : 'wechat';
                    return <AntDesign name={iconName} size={size} color={color} />;
                } else if (route.name === 'CreatePost') {
                    iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                } else if (route.name === 'Notifications') {
                    iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                } else if (route.name === 'UserProfile') {
                    iconName = focused ? 'user' : 'user';
                    return <SimpleLineIcons name={iconName} size={22} color={color} />;
                }
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}


    >
        <Tab.Screen name='HomeStack' component={HelpStackScreens}  options={{ title: '', header: () => null }} />
        <Tab.Screen name='Chat' component={UserProfileScreens} options={{ title: '', header: () => null }} />
        <Tab.Screen name='CreatePost' component={CreatePost} options={{
            title: '',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} />
        <Tab.Screen name='Notifications' component={UserPostHelpScreen} options={{ title: '', header: () => null }} />
        <Tab.Screen name="UserProfile" component={FileUploadExampleScreen} options={{ title: '', header: () => null }} />
    </Tab.Navigator>
    );
}
import React from 'react'
import { Image } from "react-native";

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

import UserNotificationScreen from '../screens/userNotificationsScreen'

import PostTypeSelection from '../screens/Posts/Create/PostTypeSelection';
import PostCategorySelection from "../screens/Posts/Create/PostCategorySelection";
import PostDataForm from "../screens/Posts/Create/PostDataForm";
import PostUploads from "../screens/Posts/Create/PostUploads";
import PostReview from "../screens/Posts/Create/PostReview";

const CreatePostStack = createStackNavigator();

function createPostStack() {
    return (
        <CreatePostStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e89b8d',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center'
                }
            }}
        >
            <CreatePostStack.Screen name='PostTypeSelection' initialParams={{"yes":"no"}} component={PostTypeSelection}  options={{
                title: 'Select type'
            }} />
            <CreatePostStack.Screen name='PostCategorySelection' component={PostCategorySelection}  options={{
                title: 'Select Category'
            }} />
            <CreatePostStack.Screen name='PostDataForm' component={PostDataForm}  options={{ title: 'Fill Info' }} />
            <CreatePostStack.Screen name='PostUploads' component={PostUploads}  options={{ title: 'Add Photos' }} />
            <CreatePostStack.Screen name='PostReview' component={PostReview}  options={{ title: 'Review Info' }} />

        </CreatePostStack.Navigator>

    );
}

const HomeStack = createStackNavigator();

function HomeStackScreens() {
    return (
        <HomeStack.Navigator

            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e89b8d',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center'
                }
            }}

        >
            <HomeStack.Screen name="Home" component={HomeScreen}  options={{ title: 'ALTRUIST' }} />
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

export default function HomeTabs() {
    return (
    <Tab.Navigator


        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') {
                    if( focused ){
                        return <Ionicons name='ios-home' size={size} color={color} />;
                    }else{
                        return <Ionicons name="md-home" size={size} color={color} />;
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
        tabBarOptions={
            {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showIcon: true,
            }
        }


    >
        <Tab.Screen name='HomeStack' component={HomeStackScreens}  options={{ title: '', header: () => null }} />
        <Tab.Screen name='Chat' component={UserProfileScreens} options={{ title: '', header: () => null }} />
        <Tab.Screen name='CreatePost' component={createPostStack} options={{
            tabBarVisible : false,
            title: '',
        }} />
        <Tab.Screen name='Notifications' component={UserNotificationScreen} options={{ title: '' }} />
        <Tab.Screen name="UserProfile" component={UserProfileScreens} options={{ title: '' }} />
    </Tab.Navigator>
    );
}
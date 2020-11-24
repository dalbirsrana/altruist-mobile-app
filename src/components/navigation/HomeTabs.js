import React from 'react'
import { Image } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen'
import HelpScreen from '../screens/Posts/SingleView/SingleHelpScreen'

import UserProfileScreen from '../screens/UserProfileScreen'
import UserPostsScreen from '../screens/UserPostsScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'

import UserActivityScreen from '../screens/UserActivityScreen'

import UserNotificationScreen from '../screens/userNotificationsScreen'

import PostTypeSelection from '../screens/Posts/Create/PostTypeSelection';
import PostCategorySelection from "../screens/Posts/Create/PostCategorySelection";
import PostDataForm from "../screens/Posts/Create/PostDataForm";
import PostUploads from "../screens/Posts/Create/PostUploads";
import PostReview from "../screens/Posts/Create/PostReview";
import Create from "../screens/Posts/Create/Create";
import colors from "../../colors/colors";


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

            <CreatePostStack.Screen name='Create'  initialParams={{"comingFromTabButton":true}}  component={Create}  options={{ title: 'Creating Post' }} />


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
        <UserProfileStack.Navigator
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
            <UserProfileStack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: ''}} />
            <UserProfileStack.Screen name="UserPosts" component={UserPostsScreen} options={{ title: 'Your Posts' }} />
            <UserProfileStack.Screen name="UserSettings" component={UserSettingsScreen} options={{ title: 'Edit Profile'}} />
        </UserProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(100000));
}

export default function HomeTabs() {
    return (
    <Tab.Navigator


        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') {
                    if( focused ){
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Home_filled.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,
                               // backgroundColor:colors.secondary,

                            }}

                        />
                            ;

                        }else{
                        return <Image
                            source={
                               require('../../../assets/Icons_svg/Icons_Altruist_Home.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12, marginBottom:0
                            }}

                        />;
                    }
                } else if (route.name === 'Chat') {

                    if( focused ){
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Message_filled.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;

                    }else{
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Message.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;
                    };
                } else if (route.name === 'CreatePost') {


                    if( focused ){
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Add_Post_filled.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;

                    }else{
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Add_Post.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;
                    };



                } else if (route.name === 'Notifications') {
                    if( focused ){
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Notification_filled.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;

                    }else{
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_Notification.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;
                    };



                } else if (route.name === 'UserProfile') {
                    if( focused ){
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_User_filled.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;

                    }else{
                        return <Image
                            source={
                                require('../../../assets/Icons_svg/Icons_Altruist_User.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                marginTop:12,
                                marginBottom:0,

                            }}

                        />;
                    };




                }
            },
        })}
        tabBarOptions={
            {
                paddingTop:105,
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showIcon: true,
            }
        }
    >
        <Tab.Screen name='HomeStack' initialParams={{postCreatedProp: getRandomInt() }}  component={HomeStackScreens}  options={{ title: '', header: () => null }} />
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
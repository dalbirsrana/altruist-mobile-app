import React from 'react'
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import PostTypeSelection from "../screens/Posts/Create/PostTypeSelection";
import PostCategorySelection from "../screens/Posts/Create/PostCategorySelection";
import PostDataForm from "../screens/Posts/Create/PostDataForm";
import PostUploads from "../screens/Posts/Create/PostUploads";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeTabs from "./HomeTabs";

const CreatePostStack = createStackNavigator();

export default function createPostStack() {
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
        <CreatePostStack.Screen name='PostReview' component={PostDataForm}  options={{ title: 'Fill Info' }} />


        <CreatePostStack.Screen name='HomeTabs' component={HomeTabs} options={{ headerShown: false }}   />


    </CreatePostStack.Navigator>

    );
}
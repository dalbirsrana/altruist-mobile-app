import React from 'react'
import {Image, Button, StyleSheet, Text, View } from 'react-native';
import {AuthContext} from "../navigation/AuthProvider";
import colors from "../../colors/colors";
import { color } from 'react-native-reanimated';

import readIcon from "../../../assets/favicon.png"
import userImage from "../../../assets/favicon.png"
import postImage from "../../../assets/splash.png";


const UserPostHelp = ( {navigation} ) => (
    <View style={styles.container}>

     
    <Text style={styles.name}>
        ALTRUIST
    </Text>
  
    <Image source={postImage} style={styles.postImage} />

    <View style={styles.profileBar}>
        <Image source={userImage} />
        <View style={styles.userInfo}>
            <Text style={styles.userName}> Pawandeep </Text>
            <Text style ={styles.postCategory}> Study-Doubts </Text>
        </View>
        <Image source={readIcon} styles={styles.readIcon} />
    
    </View>

</View>
)

export default UserPostHelp;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    name: {
        textAlign:'center',
        width: '100%',
        height:'auto',
        backgroundColor: colors.primary,
        padding: 20,
        color: colors.white,
        fontSize: 20,
        marginVertical: 0,
    },

    postImage: {
       marginHorizontal: 10,
       marginVertical: 0,
       width: '100%',
       height: '100%', 
    },

    profileBar: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',

    },

    userImage:{
        flex: 1,
        width: 100,
        height: 100,
        // borderRadius: '50%',
    },

    userInfo: {
        margin: 15, 
        flex: 2,
        // display: flex,
        // flexDirection: "column",
        padding:10,
    },

    userName:{
        flex:1,
    },
    
    postCategory:{
        flex:1,
    },

    readIcon: {
        flex:1,
        justifyContent:"flex-end",
    },

});
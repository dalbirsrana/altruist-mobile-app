import React from 'react'
import {Image, Button, StyleSheet, Text, View } from 'react-native';
import {AuthContext} from "../navigation/AuthProvider";
import colors from "../../colors/colors";
import { color } from 'react-native-reanimated';

import userImage from "../../../assets/favicon.png"
import postImage from "../../../assets/splash.png";
import reportIcon from "../../../assets/Icons_Altruist_Report.png"



const UserPostHelp = ( {navigation} ) => (
    <View style={styles.container}>

     
    <Text style={styles.name}>
        ALTRUIST
    </Text>
  
    <Image source={postImage} style={styles.postImage} />

    <View style={styles.postContent}>
        <Image source={userImage} />
        <View style={styles.userInfo}>
            <Text style={styles.userName}> Pawandeep </Text>
            <Text style ={styles.postCategory}> Study-Doubts </Text>
        </View>
        <Image source={reportIcon} styles={styles.reportIcon} />
    
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
       width: '50%',
       height: '50%', 
    },

    postContent: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'nowrap',
        margin: 30,

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
        flexDirection: "column",
        padding:10,
    },

    userName:{
        flex:1,
    },
    
    postCategory:{
        flex:1,
    },

    reportIcon: {
        flex:0,
        justifyContent:"flex-end",
        height: 5,
        width: 5,
    },

});
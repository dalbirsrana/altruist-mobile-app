import React from 'react';
import {Image, Button, StyleSheet, Text, View } from 'react-native';
import {AuthContext} from "../navigation/AuthProvider";
import postImage from "../../../assets/splash.png";
import colors from "../../colors/colors";
import { color } from 'react-native-reanimated';

import editPostIcon from "../../../assets/Icons_Altruist_Edit.png"
import settingIcon from "../../../assets/Icons_Altruist_Settings.png"
import contactIcon from "../../../assets/Icons_Altruist_Help.png"
import logoutIcon from "../../../assets/Icons_Altruist_Logout.png"
import nextIcon from "../../../assets/Icons_Altruist_next.png"





const UserProfile = ( {navigation} ) => (
    <View style={styles.container}>

     
        <View style= {styles.thumbnail}>
            <Image source={postImage} style={{height: 400, width: 400 , borderRadius: 400/2 }} />
            <Text style={styles.userName}>Pawandeep Singh</Text>
            <Text style={styles.userCollege}>Langara College</Text>
        </View>

        <View style ={styles.optionsList}>

            <View style={styles.option}>
              <Image source={editPostIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Posts</Text>
              <Image source={nextIcon} style={styles.optionArrow}/> 
            </View>

            <View style={styles.option} >
              <Image source={settingIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Settings</Text>
              <Image source={nextIcon} style={styles.optionArrow}/> 
            </View>

            <View style={styles.option}>
              <Image source={contactIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Contact Us</Text>
              <Image source={nextIcon} style={styles.optionArrow}/> 
            </View>
            
        </View>
      
        <View style={styles.logout}>
              <Image source={logoutIcon} style={styles.logoutIcon}/>
              <Text style={styles.logoutTitle}>Log Out</Text>
        </View>


    </View>
)

export default UserProfile;


const styles = StyleSheet.create({
   

    container: {
      flex:1,
      flexDirection:"column",
    },

    thumbnail: {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 0,
        paddingBottom: 10,   
    },

    userName: {
        color: "black",
        marginVertical: 5,
        fontSize:30,
    },

    userCollege: {
        color: "black",
        marginVertical: 5,
        fontSize:15,
    },

    optionsList:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding:30,
    },

    option: {
        flex:1,
        flexDirection:"row",
        flexWrap:"nowrap",
        justifyContent: "space-between",
        borderTopColor: colors.black,
        borderBottomColor: colors.black,
    },
   
    optionIcon: {
        flex: 0,
        width: 35,
        height: 35,
    },

    optionTitle:{
        flex:3,
        paddingLeft: 20,
        fontWeight: "bold",
    },

    optionArrow: {
        flex: 0,
        width: 20,
        height: 20,
    },

    logout: {
        flex:1,
        flexDirection: "row",
        flexWrap:"nowrap",
        justifyContent: "space-between",
        padding: 30,
    },

    logoutIcon: {
        flex: 0,
        width: 35,
        height: 35,
    },

    logoutTitle: {
        flex: 1,
        fontWeight: "bold",
    },

});
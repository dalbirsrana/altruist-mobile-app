import React from 'react';
import {Image, Button, StyleSheet, Text, View } from 'react-native';
import {AuthContext} from "../navigation/AuthProvider";
import postImage from "../../../assets/splash.png";
import colors from "../../colors/colors";
import { color } from 'react-native-reanimated';

import optionIcon from "../../../assets/favicon.png"
import userImage from "../../../assets/favicon.png"


const UserProfile = ( {navigation} ) => (
    <View style={styles.container}>

     
        <View style= {styles.thumbnail}>
            <Image source={postImage} style={{height: 400, width: 400 , borderRadius: 400/2 }} />
            <Text style={styles.userName}>Pawandeep Singh</Text>
            <Text style={styles.userCollege}>Langara College</Text>
        </View>

        <View style ={styles.optionsList}>

            <View style={styles.option}>
              <Image source={optionIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Posts</Text>
              <Text style={styles.optionArrow}> - </Text>
            </View>

            <View style={styles.option} >
              <Image source={optionIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Settings</Text>
              <Text style={styles.optionArrow}> - </Text>
            </View>

            <View style={styles.option}>
              <Image source={optionIcon} style={styles.optionIcon}/>
              <Text style={styles.optionTitle}>Contact Us</Text>
              <Text style={styles.optionArrow}> - </Text>
            </View>
            
        </View>
      
        <View>
            
        </View>

    </View>
)

export default UserProfile;


const styles = StyleSheet.create({
   

    container: {
      flex:1,
      flexDirection:"column",     
    //   justifyContent: 'center',   
    //   backgroundColor: colors.white,
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
        width: 50,
        height: 50,
    },
    optionTitle:{
        flex:3,
        paddingLeft: 20,
    },
    optionArrow: {
        flex: 0,
    },

});
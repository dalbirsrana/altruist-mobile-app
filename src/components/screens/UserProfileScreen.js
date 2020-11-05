import React, {useContext} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";


import postImage from "../../../assets/user-avatar.png";
import colors from "../../colors/colors";
// import {color} from "react-native-reanimated";

import editPostIcon from "../../../assets/Icons_Altruist_Edit.png";
import settingIcon from "../../../assets/Icons_Altruist_Settings.png";
import contactIcon from "../../../assets/Icons_Altruist_Help.png";
import logoutIcon from "../../../assets/Icons_Altruist_Logout.png";
import nextIcon from "../../../assets/Icons_Altruist_next.png";


const UserProfile = ({ navigation }) => {

    const {user, logout} = useContext(AuthContext)

    return (

        <View style = {styles.container}>
            
            <View style = {styles.thumbnail}>
                { 
                    user.profileImage 
                    ? 
                    (<Image source={user.profileImage} style = {{height: 200, width: 200, borderRadius: 20 }} />) 
                    : 
                    ( <Image source = {postImage} style = {{height: 200, width: 200, borderRadius: 20 }} /> ) 
                }
                
                <Text style = {styles.userName}>
                    {user.firstName} {user.lastName}
                </Text> 
                <Text style = {styles.userCollege}> 
                    Langara College 
                </Text>
            </View >

            <View style = {styles.optionsList} >
                <View style = {styles.option} >
                    <Image source={editPostIcon} style={styles.optionIcon} />
                    <Text style={styles.optionTitle}>
                        Posts
                    </Text> 
                    <Image source={nextIcon} style={styles.optionArrow} /> 
                </View >

                <View style = {styles.option}>
                    <Image source = {settingIcon} style = {styles.optionIcon } />
                    <Text style = {styles.optionTitle}> 
                        Settings 
                    </Text> 
                    <Image source = {nextIcon} style = {styles.optionArrow }/> 
                </View >

                <View style = {styles.option}>
                    <Image source = {contactIcon} style = {styles.optionIcon} /> 
                    <Text style = {styles.optionTitle}>
                        Contact Us
                    </Text> 
                    <Image source = {nextIcon} style = {styles.optionArrow}/> 
                </View> 
            
            </View>

            <View style={styles.logout}>
                <Image source={logoutIcon} style={styles.logoutIcon} /> 
                <TouchableOpacity onPress={() => logout()} style={styles.logoutTitle}>
                    <Text style={{fontWeight: "bold"}}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View > 
        
        
        </View>

    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },

    thumbnail: {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
        backgroundColor: colors.primary,
        padding: 10,
    },

    userName: {
        color: "black",
        marginVertical: 5,
        fontSize: 30,
    },

    userCollege: {
        color: "black",
        marginVertical: 5,
        fontSize: 15,
    },

    optionsList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },

    option: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderTopColor: colors.black,
        borderBottomColor: colors.black,
    },

    optionIcon: {
        width: 35,
        height: 35,
    },

    optionTitle: {
        flex: 3,
        paddingLeft: 20,
        fontWeight: "bold",
    },

    optionArrow: {
        width: 20,
        height: 20,
    },

    logout: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30,
    },

    logoutIcon: {
        width: 35,
        height: 35,
        marginLeft: 4,
    },

    logoutTitle: {
        flex: 1,
        paddingLeft: 20,
    },
});
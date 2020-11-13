import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";


import postImage from "../../../assets/user-avatar.png";
import colors from "../../colors/colors";

import editPostIcon from "../../../assets/Icons_Altruist_Edit.png";
import settingIcon from "../../../assets/Icons_Altruist_Settings.png";
import contactIcon from "../../../assets/Icons_Altruist_Help.png";
import logoutIcon from "../../../assets/Icons_Altruist_Logout.png";
import nextIcon from "../../../assets/Icons_Altruist_next.png";
import {windowWidth} from "../../utils/Dimensions";
import FileUploadExampleScreen from "./FileUploadExampleScreen";
import API from "../../services/api";


const UserProfile = ({ navigation }) => {

    const { user, logout, pictureUploaded} = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState( "" );
    const [loading, setLoading] = useState( true );

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount){
            setProfileImage( user.profileImage );
            setLoading( false );
        }
        return () => {
            isUnMount = true;
        }
    });

    const changeProfilePicture = async ( uploadObject ) => {
        setLoading( true );
        setProfileImage( uploadObject.objectUrl );
        let data = {
            profile_picture : uploadObject.key
        };
        let changePicture = await API.User.changePicture( data );
        if( changePicture.success ){
            pictureUploaded( changePicture.data );
            setProfileImage( changePicture.data.profile_picture );
            setLoading( false );
        }
    }

    return (

        <ScrollView style = {styles.container}>


            <View style = {styles.thumbnail}>

                {
                    profileImage
                    ? 
                    (
                        <View opacity={ loading ? 0.5 : 1}  >
                            <View style={ styles.thumbnail  }>
                                <Image source={{uri: profileImage}} style = {{height: 200, width: 200, borderRadius: 100 }} />
                                <View
                                    style={buttonStyles.buttonContainer} >
                                    <FileUploadExampleScreen location={"ChangeProfilePicture"}
                                                             imageUploaded={( event ) => {  changeProfilePicture( event );   }}  />
                                </View>
                            </View>
                        </View>
                    )
                    : 
                    (
                        <View opacity={ loading ? 0.5 : 1} >
                            <View style = {styles.thumbnail} >
                                <Image source = {postImage} style = {{height: 200, width: 200, borderRadius: 100 }} />
                                <View
                                    style={buttonStyles.buttonContainer} >
                                    <FileUploadExampleScreen location={"AddProfilePicture"}
                                                             imageUploaded={( event ) => {  changeProfilePicture( event );   }}  />
                                </View>
                            </View>
                        </View>
                    )
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
                    <TouchableOpacity onPress={() => navigation.navigate('UserPosts')} style={styles.optionTitle}>
                        <Text>
                            My Posts
                        </Text>
                    </TouchableOpacity>
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
        
        
        </ScrollView>

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

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom:10,
        marginBottom: 10,
        width: windowWidth / 2.5,
        height: 'auto',
        borderColor: colors.primary,
        backgroundColor: colors.transparent,
        borderWidth:2,
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 4,
    },
    buttonText: {
        fontWeight:'bold',
        fontSize: 12,
        color: colors.white,
    },
});
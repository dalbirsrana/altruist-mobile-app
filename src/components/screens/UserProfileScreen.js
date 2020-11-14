import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native";
import {AuthContext} from "../navigation/AuthProvider";


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


const UserProfile = ({navigation}) => {

    const {user, logout, pictureUploaded} = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            setProfileImage(user.profileImage);
            setLoading(false);
        }
        return () => {
            isUnMount = true;
        }
    });

    const changeProfilePicture = async (uploadObject) => {
        setLoading(true);
        setProfileImage(uploadObject.objectUrl);
        let data = {
            profile_picture: uploadObject.key
        };
        let changePicture = await API.User.changePicture(data);
        if (changePicture.success) {
            pictureUploaded(changePicture.data);
            setProfileImage(changePicture.data.profile_picture);
            setLoading(false);
        }
    }

    return (

        <ScrollView style={styles.container}>


            <View style={styles.thumbnail}>

                {
                    profileImage
                        ?
                        (
                            <View opacity={loading ? 0.5 : 1}>
                                <View style={styles.thumbnail}>
                                    <Image source={{uri: profileImage}}
                                           style={{height: 200, width: 200, borderRadius: 100}}/>
                                    <View
                                        style={buttonStyles.buttonContainer}>
                                        <FileUploadExampleScreen location={"ChangeProfilePicture"}
                                                                 imageUploaded={(event) => {
                                                                     changeProfilePicture(event);
                                                                 }}/>
                                    </View>
                                </View>
                            </View>
                        )
                        :
                        (
                            <View opacity={loading ? 0.5 : 1}>
                                <View style={styles.thumbnail}>
                                    <Image source={postImage} style={{height: 200, width: 200, borderRadius: 100}}/>
                                    <View
                                        style={buttonStyles.buttonContainer}>
                                        <FileUploadExampleScreen location={"AddProfilePicture"}
                                                                 imageUploaded={(event) => {
                                                                     changeProfilePicture(event);
                                                                 }}/>
                                    </View>
                                </View>
                            </View>
                        )
                }
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.userCollege}>
                    Langara College
                </Text>

                <View style={styles.optionsList}>

                    <TouchableOpacity onPress={() => navigation.navigate('UserPosts')}>
                        <View style={styles.option}>
                            <Image source={editPostIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionTitle}>
                                Posts
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.option}>
                        <Image source={settingIcon} style={styles.optionIcon}/>
                        <Text style={styles.optionTitle}>
                            Settings
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => logout()}>
                        <View style={styles.option}>
                            <Image source={logoutIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionTitle}>
                                Log Out
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

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
        paddingBottom: 23

    },

    userName: {
        color: "black",
        fontSize: 30,
    },

    userCollege: {
        color: "black",
        fontSize: 15,
    },

    optionsList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        width: "100%",

    },

    option: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    },


    optionIcon: {
        width: 35,
        height: 35,

    },

    optionTitle: {
        paddingLeft: 0,
        marginTop: 3,
        fontWeight: "bold",
    },

    profileSecContainer: {
        display: "flex",
        flexDirection: "column"
    },

    detailContainer: {
        backgroundColor: colors.white,
        position: "relative",
        marginTop: -20,
        marginLeft: 10,
        marginRight: 10,
        height: "90%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        shadowOffset: {width: 1, height: 0,},
        shadowColor: 'black',
        shadowOpacity: 0.4,
    },


});

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        marginBottom: 10,
        width: windowWidth / 2.5,
        height: 'auto',
        borderColor: colors.primary,
        backgroundColor: colors.transparent,
        borderWidth: 2,
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: colors.white,
    },
});
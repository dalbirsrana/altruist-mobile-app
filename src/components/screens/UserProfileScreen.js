import React, {useContext, useEffect, useState} from "react";
import {Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AuthContext} from "../navigation/AuthProvider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import postImage from "../../../assets/user-avatar.png";
import colors from "../../colors/colors";

import editPostIcon from "../../../assets/Icons_Altruist_Edit.png";
import settingIcon from "../../../assets/Icons_Altruist_Settings.png";
import logoutIcon from "../../../assets/Icons_Altruist_Logout.png";
import API from "../../services/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import getRouteParam from "../helper/getRouteParam";

const UserProfile = ({ navigation , route }) => {

    const {user, logout, pictureUploaded, dispatch} = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState("");
    const [loading, setLoading] = useState(true);

    let photoChanged = getRouteParam(route, "photoChanged", false);

    const [openCamera, setOpenCamera] = useState(false);

    const [userdata, setUserData] = useState({});

    const getUserData = async () => {
        let N = await API.User.getInfo()
        if (N !== undefined && N.success) {
            setProfileImage(N.data.profile_picture);
            setUserData(N.data);
            setLoading(false);
        } else if (N !== undefined && !N.success) {
            setLoading(false)
            if (N.tokenExpired) {
                logout();
            }
        }
    }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            getUserData();
            navigation.setOptions({
                headerRight: () => <Text/>,
                headerLeft: () => (
                    <View style={{
                        left: 20
                    }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("HomeStack");
                            }
                            }
                        >
                            <Ionicons name='md-arrow-back' color={"white"} size={32}/>
                        </TouchableOpacity>
                    </View>
                ),
            });
        }
        return () => {
            isUnMount = true;
        }
    }, [ photoChanged ] );

    const changeProfilePicture = async (uploadObject) => {
        setLoading(true);
        setProfileImage(uploadObject.objectUrl);
        let data = {
            profile_picture: uploadObject.key
        };
        let changePicture = await API.User.updateProfile(data);
        console.log("changePicture", changePicture);
        if (changePicture.success) {
            pictureUploaded(changePicture.data);
            console.log("changeProfilePicture", changePicture.data);
            dispatch(changePicture.data);

            setProfileImage(changePicture.data.profile_picture);
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}

                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => {
                            getUserData();
                        }}/>
                    }

        >
            <View style={styles.thumbnail}>
                {
                    profileImage
                        ?
                        (
                            <View opacity={loading ? 0.5 : 1}>
                                <View style={styles.thumbnail}>

                                    <Image source={{uri: profileImage}}
                                           style={{height: 200, width: 200, borderRadius: 100}}/>
                                    <View style={{ marginTop:20, height: 40}} >
                                        <TouchableOpacity style={{}}
                                                          onPress={() => {
                                                              navigation.navigate('CameraScreen',{})
                                                          }}
                                        >
                                            <MaterialIcons style={styles.icon} name={"add-a-photo"}
                                                      size={40} color={colors.white}/>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                        :
                        (
                            <View opacity={loading ? 0.5 : 1}>
                                <View style={styles.thumbnail}>
                                    <Image source={postImage} style={{height: 200, width: 200, borderRadius: 100}}/>
                                    <View style={{ marginTop:20, height: 40}} >
                                        <TouchableOpacity style={{}}
                                                          onPress={() => {
                                                              navigation.navigate('CameraScreen',{})
                                                          }}
                                        >
                                            <Ionicons style={styles.icon} name={"ios-camera"}
                                                      size={40} color={colors.white}/>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                }
            </View>
            <View style={styles.detailContainer}>

                <Text style={styles.userName}>
                    {userdata.firstName} {userdata.lastName}
                </Text>
                <Text style={styles.userCollege}>
                    {userdata.college}
                </Text>
                <Text style={styles.userCollege}>
                    Help points: {userdata.helps_provided}
                </Text>
                <Text style={styles.userCollege}>
                    {userdata.bio}
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
                    <TouchableOpacity onPress={() => navigation.navigate('UserSettings')}>
                        <View style={styles.option}>
                            <Image source={settingIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionTitle}>
                                Settings
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => logout()}>
                        <View style={styles.option}>
                            <Image source={logoutIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionTitle}>
                                Logout
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
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

    },


    optionIcon: {
        width: 25,
        height: 25,
    },

    optionTitle: {
        paddingLeft: 0,
        marginTop: 3,
        fontWeight: "bold",
        color: colors.primary,
        fontSize: 12
    },

    logout: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30,
    },

    logoutIcon: {
        width: 25,
        height: 25,
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
        borderRadius: 8,
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
        bottom: 0,
        right: -15,
        marginBottom: 10,
        width: 50,
        height: 'auto',
        borderColor: colors.secondary,
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
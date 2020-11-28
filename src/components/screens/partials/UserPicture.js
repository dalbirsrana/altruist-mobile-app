import React, {useEffect, useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import postImage from "../../../../assets/user-avatar.png";
import FileUploadExampleScreen from "../FileUploadExampleScreen";

const UserPicture = ({picture}) => {

    const [profileImage, setProfileImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            setProfileImage(picture);
            setLoading(false);
        }
        return () => {
            isUnMount = true;
        }
    });

    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default UserPicture;

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
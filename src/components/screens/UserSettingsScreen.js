import React, {useContext, useEffect, useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {AuthContext} from "../navigation/AuthProvider"

import colors from "../../colors/colors";
import FormButton from "../../common/FormButton"
import FormTextArea2 from "../../common/FormTextArea2"
import FormInput3 from "../../common/FormInput3"
import API from "../../services/api";
import Loading from "../../common/Loading";


const UserSettings = ({navigation}) => {

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userdata, setUserData] = useState({});

    const getUserData = async () => {
        let N = await API.User.getInfo()
        if (N !== undefined && N.success) {
            setProfileImage(N.profile_picture);
            setUserData(N.data);
            setLoading(false)
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
        }
        return () => {
            isUnMount = true;
        }
    });

    return (
        <ScrollView style={styles.container}>

            {
                isLoading ? <Loading/> : <View style={{flex: 1}}>

                    <View style={styles.settingsContainers}>
                        <Text style={styles.txtColor}>First Name</Text>
                        <FormInput3>{userdata.firstName}</FormInput3>
                    </View>

                    <View style={styles.settingsContainers}>
                        <Text style={styles.txtColor}>Last Name</Text>
                        <FormInput3>{userdata.lastName}</FormInput3>
                    </View>

                    <View style={styles.settingsContainers}>
                        <Text style={styles.txtColor}>Mail</Text>
                        <FormInput3 disabled>{userdata.email}</FormInput3>
                    </View>

                    <View style={styles.settingsContainers}>
                        <Text style={styles.txtColor}>Contact</Text>
                        <FormInput3>{userdata.phone}</FormInput3>
                    </View>

                    <View style={styles.settingsContainerTextArea}>
                        <Text style={styles.txtColor}>Bio</Text>
                        <FormTextArea2>{userdata.bio}</FormTextArea2>
                    </View>

                    <View style={styles.settingsContainers}>
                        <Text style={styles.txtColor}> </Text>
                        <FormButton
                            buttonTitle="Update"
                            onPress={() => navigation.navigate('UserProfile')}
                        />
                    </View>


                </View>
            }

        </ScrollView>
    )
}

export default UserSettings


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
    },
    settingsContainers: {
        flexGrow: 0,
        flexBasis: 90,
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    settingsContainerTextArea: {
        flexGrow: 0,
        flexBasis: 120,
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    txtColor: {
        flexBasis: 24,
        flexGrow: 0,
        flexShrink: 0,
        fontSize: 16,
        color: colors.primary,
    },

});
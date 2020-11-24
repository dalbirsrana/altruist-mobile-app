import React, {useContext, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {AuthContext} from "../navigation/AuthProvider"

import colors from "../../colors/colors";
import FormButton from "../../common/FormButton"
import FormTextArea2 from "../../common/FormTextArea2"
import FormInput3 from "../../common/FormInput3"
import {windowWidth} from "../../utils/Dimensions";


const UserSettings = ({navigation}) => {

    const {user} = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>First Name</Text>
                <FormInput3>{user.firstName}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Last Name</Text>
                <FormInput3>{user.lastName}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Mail</Text>
                <FormInput3>{user.email}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Contact</Text>
                <FormInput3>{user.phone}</FormInput3>
            </View>

            <View style={styles.settingsContainerTextArea}>
                <Text style={styles.txtColor}>Bio</Text>
                <FormTextArea2>{user.bio}</FormTextArea2>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}> </Text>
                <FormButton
                    buttonTitle="Update"
                    onPress={() => navigation.navigate('UserProfile')}
                />
            </View>

        </View>
    )
}

export default UserSettings


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsContainers: {
        flexGrow: 0,
        flexBasis: 90,
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    settingsContainerTextArea :{
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
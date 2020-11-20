import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import colors from "../../colors/colors";
import FormButton from "../../common/FormButton";
import FormTextArea2 from "../../common/FormTextArea2";
import FormInput3 from "../../common/FormInput3";
import {windowWidth} from "../../utils/Dimensions";


const UserSettings = ({navigation}) => {
    const [name, setName] = useState("HK Gill");
    const [email, setEmail] = useState("hkgill@ymail.com");
    const [college, setCollege] = useState("Langara College");
    const [contact, setContact] = useState("+1234567895");
    const [bio, setBio] = useState("cndb cb hbsas");

    return (
        <View style={styles.container}>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Name:</Text>
                <FormInput3>{name}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Mail:</Text>
                <FormInput3>{email}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>College:</Text>
                <FormInput3>{college}</FormInput3>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}>Contact:</Text>
                <FormInput3>{contact}</FormInput3>
            </View>

            <View style={styles.settingsContainerTextArea}>
                <Text style={styles.txtColor}>Bio:</Text>
                <FormTextArea2>{bio}</FormTextArea2>
            </View>

            <View style={styles.settingsContainers}>
                <Text style={styles.txtColor}> </Text>
                <FormButton
                    buttonTitle="Login"
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
        flexBasis: 60,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,

    },
    settingsContainerTextArea :{
        flexGrow: 0,
        flexBasis: 140,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    txtColor: {
        flex: 0.5,
        fontSize: 15,
        color: colors.primary,
    },

});
import {Image, Text, View} from "react-native";
import React, {useState} from "react";
import logo from "../../../assets/icon.png";
import FormInput from "../../common/FormInput";
import FormButton from "../../common/FormButton";
import styles from "../../Styles/CommonUnauthenticated";
import API from "../../services/api";


export default function UpdateUserProfile({navigation}) {

    const [username, setUsername] = useState("");
    const [verification_token, setVerificationToken] = useState("");
    const [errors, setErrors] = useState({});

    function isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }

    const useEffect = (() => {
        // console.log( errors );
    });

    const submitForm = async () => {
        let data = {
            username: username,
            verification_token: verification_token
        };

        let verifyAccount = await API.verifyAccount(data);

        if (verifyAccount.success) {
            navigation.navigate("SignIn");
        } else {
            setErrors(verifyAccount.data);
        }
    }

    let errorList = [];
    for (const property in errors) {
        var singleAttributeErrors = errors[property];
        for (var i = 0; i < singleAttributeErrors.length; i++) {
            errorList.push(<Text>{singleAttributeErrors[i]}</Text>);
        }
    }


    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={{width: 200, height: 200, marginBottom: 20}}
            />

            {errorList.length > 0 ?
                <View>
                    {errorList}
                </View>
                : null
            }


            <FormInput
                value={username}
                placeholderText="Email"
                // onChangeText={( value ) => setUsername( value )}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
            />

            <FormInput
                value={verification_token}
                placeholderText="Verification Token"
                // onChangeText={( value ) => setVerificationToken( value )}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormButton
                buttonTitle="Verify Account"
                onPress={() => submitForm()}
            />

        </View>
    )
}
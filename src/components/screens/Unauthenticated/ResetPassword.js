import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import API from '../../../services/api'

import FormButton from '../../../common/FormButton'
import FormInput from '../../../common/FormInput'

// import { AuthContext } from '../navigation/AuthProvider'

const ResetPassword = ({navigation}) => {

    const [userName, setUserName] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [msg, setMsg] = useState('')
    const [validUser, setValidUser] = useState(false)

    return (
        validUser ? (
            <View style={styles.container}>

                <Text style={styles.text}>Check mail and enter token to update password</Text>

                <Text style={styles.errorMsg}>{msg}</Text>

                <FormInput
                    value={userName}
                    placeholderText='Enter User Name'
                    onChangeText={userName => setUserName(userName)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <FormInput
                    value={token}
                    placeholderText='Enter Token'
                    onChangeText={token => setToken(token)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <FormInput
                    value={password}
                    placeholderText='Enter Password'
                    onChangeText={password => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <FormInput
                    value={confirmPassword}
                    placeholderText='Confirm Password'
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <FormButton
                    buttonTitle='Reset Password'
                    onPress={
                        async () => {
                            try {

                                let userData = {
                                    username: userName,
                                    reset_password_token: token,
                                    password: password,
                                    confirm_password: confirmPassword
                                }

                                let confirmChange = await API.changePassword(userData)


                                if (confirmChange.success) {
                                    setMsg('Password Reset Successfull, Go Back to login')
                                } else {
                                    setMsg(JSON.stringify(confirmChange.data))
                                }

                            } catch (e) {
                                console.error(e)
                            }
                        }
                    }
                />

            </View>
        ) : (
            <View style={styles.container}>

                <Text style={styles.text}>Enter Username (Email) to verify</Text>
                <Text style={styles.errorMsg}>{msg}</Text>

                <FormInput
                    value={userName}
                    placeholderText='Enter User Name'
                    onChangeText={userName => setUserName(userName)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <FormButton
                    buttonTitle='Verify Username'
                    onPress={
                        async () => {
                            try {

                                let data = {
                                    username: userName
                                }

                                let verify = await API.resetPasswordCheck(data)


                                if (verify.success) {
                                    setValidUser(true)
                                    setMsg('')
                                } else {
                                    setMsg('Invalid Username')
                                }

                            } catch (e) {
                                console.error(e)
                            }
                        }
                    }
                />

            </View>
        )
    )
}

export default ResetPassword


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    errorMsg: {
        fontSize: 16,
        color: 'red',
        marginVertical: 10
    }
});
  
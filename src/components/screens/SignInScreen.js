import React, {useState, useContext} from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native'

import FormButton from '../../common/FormButton';
import FormInput from '../../common/FormInput';
import {AuthContext} from '../navigation/AuthProvider';

import logo from '../../../assets/icon.png'

const SignInScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, skipLogin} = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 300, height: 80, marginBottom: 20}}/>

            <FormInput
                value={email}
                placeholderText='Email'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />

            <FormInput
                value={password}
                placeholderText='Password'
                onChangeText={userPassword => setPassword(userPassword)}
                secureTextEntry={true}
            />

            <FormButton buttonTitle='Login' onPress={() => login(email, password)}/>


            <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.forgot}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                              onPress={() => {
                                  if (skipLogin()) {
                                      return navigation.navigate('Home')
                                  } else {
                                      undefined
                                  }
                              }
                              }>
                <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>

        </View>
    )

}


export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgot: {
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    signup: {
        fontSize: 16,
        marginBottom: 30,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {
        fontFamily: 'Baskerville',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
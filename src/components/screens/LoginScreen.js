import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native'
import logo from '../../../assets/icon.png'

import Login from "../login/Login"

const LoginScreen = ({ navigation }) => (
    <View style={styles.container}>
        
        <View style={styles.container}>

            <Image source={logo} style={{width: 300, height: 80, marginBottom: 20 }} />
            
            <Login />

            <TouchableOpacity>
                <Text style={styles.forgot}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
        </View>

    </View>
)

export default LoginScreen

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
    buttonText:{
        fontFamily: 'Baskerville',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
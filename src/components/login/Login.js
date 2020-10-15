import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
    };

    onLogin() {
        const { email, password } = this.state;
        Alert.alert('Credentials', `email: ${email} + password: ${password}`);
    }

    render() {
        return (
        <>

            <Text style={styles.titleText}>Hi, Welcome To</Text>
            <Text style={styles.titleText}>Altruist</Text>
            <TextInput
                value={this.state.email}
                keyboardType = 'email-address'
                onChangeText={(email) => this.setState({ email })}
                placeholder='email'
                placeholderTextColor = 'white'
                style={styles.input}
            />
            <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'password'}
                secureTextEntry={true}
                placeholderTextColor = 'white'
                style={styles.input}
            />
            
            <TouchableOpacity style={styles.button} onPress={this.onLogin.bind(this)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
        </>
        );
    }
}

const styles = StyleSheet.create({
    titleText:{
        fontFamily: 'Baskerville',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'green',
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
    input: {
        width: 200,
        fontFamily: 'Baskerville',
        fontSize: 20,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        marginVertical: 10,
    },
});
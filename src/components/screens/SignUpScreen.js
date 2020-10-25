import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FormButton from '../../common/FormButton'
import FormInput from '../../common/FormInput'
import { AuthContext } from '../navigation/AuthProvider'

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [msg, setMsg] = useState('')

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* error messages  */}
      <Text style={styles.errorMsg}>{msg}</Text>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        value={firstName}
        placeholderText='First Name'
        onChangeText={userFirstName => setFirstName(userFirstName)}
        autoCapitalize='none'
        keyboardType='first-name'
        autoCorrect={false}
      />
      <FormInput
        value={lastName}
        placeholderText='Email'
        onChangeText={userLastName => setLastName(userLastName)}
        autoCapitalize='none'
        keyboardType='last-name'
        autoCorrect={false}
      />
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
      <FormButton
        buttonTitle='Signup'
        onPress={async () => { 
          let signUp = await register({user_role_id:'1', firstName, lastName, email, password})

          if (signUp.success) {
            
            setMsg(`Sign Up Success with user ID: ${signUp.data[0].id} \nRedirecting to login page...`)
            
            console.log('success '+ signUp.data[0].id)
            
            navigation.navigate('SignIn')
            
          } else {
            setMsg(`SignUp failed: \n${signUp.data[0].email} \n${signUp.data[0].password}`)
          }
        } }
      />
    </View>
  );
}

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

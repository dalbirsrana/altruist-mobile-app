import React, { useContext } from 'react'
import { Image, Button, StyleSheet, Text, View } from 'react-native'
import FormButton from '../../common/FormButton'
import { AuthContext } from '../navigation/AuthProvider'

import logo from '../../../assets/icon.png'

const HomeScreen = ({ navigation }) => {
    
    const { user, logout } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <view>
                <Image source={logo} style={{width: 300, height: 80}} />

                <Text>Welcome { user.name } </Text>

                <FormButton buttonTitle='LogOut' onPress={() => logout()} />
    
                <Button 
                title="Open Drawer"
                onPress={() => navigation.navigate('Test')}
                />
    
                <Text style={styles.para}>
                    This is home page
                </Text>
    
            </view>
        </View>
    )
} 

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    para: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        textAlign: 'center',
        marginVertical: 30,
    }
});
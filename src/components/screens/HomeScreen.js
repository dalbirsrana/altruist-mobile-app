import React from 'react'
import { Image, Button, StyleSheet, Text, View } from 'react-native'
import logo from '../../../assets/icon.png'

const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <view>
            <Image source={logo} style={{width: 300, height: 80}} />

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
import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'


const UserActivity = ({navigation}) => (
    <View style={styles.container}>

        {/* <View>Screen Page</View> */}
        <Text>this is Activity page (Notifications page)</Text>

        <Button
            title="Go to home"
            onPress={() => navigation.navigate('Home')}
        />
    </View>
)

export default UserActivity


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
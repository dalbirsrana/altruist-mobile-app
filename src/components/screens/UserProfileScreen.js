import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'


const UserProfile = ( {navigation} ) => (
    <View style={styles.container}>

        {/* <View>Screen Page</View> */}
        <Text>this is User Profile page</Text>
      
        <Button 
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
    </View>
)

export default UserProfile


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
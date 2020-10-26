import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'


const UserPosts = ( {navigation} ) => (
    <View style={styles.container}>

        {/* <View>Screen Page</View> */}
        <Text>this is User Posts Page</Text>
      
        <Button 
            title="Go to home page"
            onPress={() => navigation.navigate('Home')}
        />
        <StatusBar style="auto" />
    </View>
)

export default UserPosts


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
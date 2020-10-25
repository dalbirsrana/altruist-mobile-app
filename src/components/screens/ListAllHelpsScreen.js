import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';


const ListAllHelpsScreen = ( {navigation} ) => (
    <View style={styles.container}>

        {/* <View>Screen Page</View> */}
        <Text>this is test para</Text>
      
        <Button 
            title="Open Drawer"
            onPress={() => navigation.navigate('Home')}
        />
        <StatusBar style="auto" />
    </View>
)

export default ListAllHelpsScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';



const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>

        <View>Home Page</View>
        <Text>this is test para</Text>
        <Button 
            title="Open Drawer"
            onPress={() => navigation.toggleDrawer()}
        />
        <StatusBar style="auto" />
    </View>
)

export default HomeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
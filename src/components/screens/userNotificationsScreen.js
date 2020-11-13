import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import API from "../../services/api"
import Loading from "../../common/Loading"

const UserActivity = ( {navigation} ) => {

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    const loadNotifications = async () => {
        let N = await API.User.getNotifications()

        if (N != undefined) {
            setLoading(false)
            console.log(N)
            if(N.success) {
                setNotifications(N.data)
            }
        }
    }

    useEffect( ()=> {
        let isUnMount = false
        if (!isUnMount) {
            loadNotifications()
        }
        return () => {
            isUnMount = true
        }
    }, [])


    return (
        <View style={styles.container}>

            <View>
                <Text>Notifications page</Text>
            </View>

            {
                isLoading 
                ?
                <Loading />
                :
                (
                    <View>
                        {/* {JSON.stringify(notifications)} */}
                    </View>
                )
            }

        </View>
    )
}


export default UserActivity


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
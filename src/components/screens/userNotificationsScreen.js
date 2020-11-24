import React, {useState, useEffect, useContext} from 'react'
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import API from "../../services/api"
import Loading from "../../common/Loading"
import { ScrollView } from 'react-native-gesture-handler'
import postImage from "../../../assets/user-avatar.png";
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import color from '../../colors/colors'
import {AuthContext} from "../navigation/AuthProvider";


const UserActivity = ( {navigation} ) => {

    const {user, logout} = useContext(AuthContext);

    const isFocused = useIsFocused()

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    const loadNotifications = async () => {
        let N = await API.User.getNotifications()
        if (N !== undefined && N.success ) {
            // console.log( N );
            setLoading(false)
            setNotifications(N.data)
        }else if( N !== undefined && !N.success ){
            setLoading(false)
            if( N.tokenExpired ){
                logout();
            }
            return true;
        }
    }

    //Rerender screen on tab press
    React.useEffect( ()=> {
        console.log('page load');
        let isUnMount = false;
        if (!isUnMount){
            loadNotifications()
        }
        if( isFocused ){
            loadNotifications()
        }
        return () => {
            isUnMount = true;
        }
    }, [navigation, isFocused])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            <ScrollView>
                {
                    isLoading
                    ? <Loading />
                    : notifications.length
                    ?   (
                            <VirtualizedList
                                data={notifications}
                                renderItem={({item, index}) => (
                                    <Item index={index} post={item} />
                                )}
                                keyExtractor={item => item.id.toString()}
                                getItemCount={(data) => data.length }
                                getItem={ (data, index) => data[index] }
                            />
                        )
                    : (<Text style={styles.noNotification}>No notification</Text>)
                }
            </ScrollView>
        </View>
    )
}

export default UserActivity



const Item = ({index, post}) => {

    let BGColor = color.white

    if (index % 2 !== 0 ) {
        BGColor = color.primaryTransparent
    } else {
        BGColor = color.secondaryTransparent
    }

    return (
        <View style={{backgroundColor: BGColor}}>
        <View style={styles.postCard}>
            { post.user.profile_picture
                ?  (<Image source={{uri: post.user.profile_picture}} style={styles.postImage} />)
                :  (<Image source={postImage} style={styles.postImage} />)
            }
            <View style={styles.textContent}>
                <Text style={styles.textCommentType}>{post.post_comment_type}</Text>
                <Text>{post.text}</Text>
            </View>
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    header: {
        paddingBottom: 15,
        height: windowHeight / 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.primary,
        color: '#ffffff',
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    noNotification: {
        paddingTop: 100,
        textAlign: 'center',
        fontSize: 30,
    },
    postCard: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    postImage: {
        width: windowWidth / 6,
        height: windowWidth / 6,
        borderRadius: windowWidth / 12,
    },
    textContent: {
        width: windowWidth / 1.3,
        paddingLeft: 20,
    },
    textCommentType: {
        color: color.primary,
        fontWeight: 'bold',
        marginBottom: 5,
    }
  });
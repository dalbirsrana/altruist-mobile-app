import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, VirtualizedList } from 'react-native'
import API from "../../services/api"
import Loading from "../../common/Loading"
import { ScrollView } from 'react-native-gesture-handler'
import { windowWidth } from '../../utils/Dimensions'
import colors from '../../colors/colors'
import { color } from 'react-native-reanimated'

const userPosts = ( {navigation} ) => {

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [activeLink, setActiveLink] = useState(true)
    const [savedLink, setSavedLink] = useState(false)
    
    const loadActivePosts = async () => {
        let Posts = await API.User.getPosts()

        if (Posts != undefined) {
            setLoading(false)
            // console.log(Posts)
            if(Posts.success) {
                setPosts(Posts.data)

                setActiveLink(true)
                setSavedLink(false)
            }
        }
    }

    const loadSavedPosts = async () => {
        let Posts = await API.User.getSavedPosts()

        if (Posts != undefined) {
            setLoading(false)
            // console.log(Posts)
            if(Posts.success) {
                setPosts(Posts.data)

                setActiveLink(false)
                setSavedLink(true)
            }
        }
    }

    useEffect( ()=> {
        let isUnMount = false
        if (!isUnMount) {
            loadActivePosts()
        }
        return () => {
            isUnMount = true
        }
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.headLinks}>
                <TouchableWithoutFeedback onPress={()=> { 
                    setLoading(true) 
                    return loadActivePosts() 
                    }}>
                    <Text style={
                        activeLink ? btnStyle.highlighted : btnStyle.normal
                    }>Active</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.headSeprator}> | </Text>
                <TouchableWithoutFeedback onPress={()=> {
                    setLoading(true)
                    return loadSavedPosts() 
                    }}>
                    <Text style={
                        savedLink ? btnStyle.highlighted : btnStyle.normal
                    }>Saved</Text>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView>
            {
                isLoading 
                ?
                <Loading />
                :
                (
                    <VirtualizedList
                        data={posts}
                        renderItem={({item, index}) => (
                            <Item index={index} post={item} />
                        )}
                        keyExtractor={item => item.id.toString()}
                        getItemCount={(data) => data.length }
                        getItem={ (data, index) => data[index] }
                    />
                )
            }
            </ScrollView>
        </View>
    )
}

export default userPosts

const Item = ({index, post}) => (
    <View style={
     index%2==0 ? 
     {backgroundColor: colors.secondaryTransparent, ...styles.postCard } : 
     {backgroundColor: colors.primaryTransparent, ...styles.postCard} 
     }>
        <Image source={{uri: post.postUploads[0]}} style={styles.postImage} />
        <View style={styles.textContent}>
            <Text style={styles.category}>{post.postCategory.title}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description.substring(0, 80)}...</Text>
        </View>
    </View>
)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    postCard: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    postImage: {
        width: windowWidth / 4,
        height: windowWidth / 4,
        borderRadius: 6,
    },
    textContent: {
        width: windowWidth / 1.4,
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {},
    headLinks: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    headSeprator: {
        marginHorizontal: 8,
    }
  });


const btnStyle = StyleSheet.create({
    normal: {
        fontSize: 20,
        fontWeight: 'normal',
        color: colors.black,
    },
    highlighted: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.primary,
    },
  })
import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View, VirtualizedList} from "react-native";
import {FlatList, ScrollView} from "react-native-gesture-handler";
import Loading from "../../../common/Loading"

import colors from "../../../colors/colors";
import postImage from "../../../../assets/user-avatar.png"
import HomePageTopSlider from "../../helper/HomePageTopSlider/HomePageTopSlider"
import TopHelper from "../../screens/partials/home/TopHelpers"
import API from "../../../services/api";
import {windowWidth} from "../../../utils/Dimensions";

const HomeScreen = ({navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])

    const loadPost = async () => {
        let postsList = await API.Post.openList()
        if (postsList !== undefined && postsList.success) {
            console.log(postsList.data)
            setPosts(postsList.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        let isUnMount = false
        if (!isUnMount) {
            loadPost()
        }

        return () => {
            isUnMount = true
        }
    }, [])


    return (
        <ScrollView style={styles.container}>

            {/* Slider container */}

            <HomePageTopSlider navigation={navigation}/>

            {/* Top Helper container */}
            <TopHelper/>

            {/* Help Posts container */}
            {
                isLoading || posts.length == 0 ? <Loading/> :
                    <View style={{flex: 1}}>
                        <VirtualizedList
                            data={posts}
                            renderItem={({index, item}) => <PostItem index={index} data={item}/>}
                            keyExtractor={item => item.id.toString()}
                            getItemCount={(data) => data.length}
                            getItem={(data, index) => data[index]}
                            style={{marginTop: 10}}
                        />
                    </View>
            }

        </ScrollView>
    )
}

export default HomeScreen;


const PostItem = ({index, data}) => {
    return (
        <View key={index} id={index} style={{
            flex: 1,
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: index % 2 == 0 ? colors.primaryTransparent : colors.secondaryTransparent
        }}>
            <View style={styles.userContainer}>
                <View style={styles.userPicContainer}>
                    {
                        data.user.profile_picture ?
                            <Image
                                source={{uri: data.user.profile_picture}}
                                style={{width: 30, height: 30, borderRadius: 15}}/>
                            :
                            <Image source={postImage}
                                   style={{width: 30, height: 30, borderRadius: 15}}/>
                    }
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.userName}>{data.user.fullName}</Text>
                    <Text style={{textAlign: "left", fontSize: 8}}>{data.city_name}</Text>
                </View>

                <View style={styles.postCatType}>
                    <Text
                        style={styles.postCatTypeTitle}>{data.postType.title === "Help Needed" ? "wants help" : "want to help"}</Text>
                    <Text style={styles.postCatTypeTitle}>{data.postCategory.title}</Text>
                </View>
            </View>


            <View style={styles.containerReview}>
                <Text style={{fontWeight: 'bold',}}>{data.title}</Text>
                <Text style={{marginVertical: 8,}}>{data.description.substring(0, 100)}</Text>

            </View>

            {
                data.postUploads.length > 0 ?

                    <FlatList
                        data={data.postUploads}
                        renderItem={({item}) => (
                            <Image source={{uri: item}} style={{width: windowWidth - 12, height: 200}}/>
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                        style={{width: windowWidth - 10, height: '100%',}}
                    />

                    : null
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    h2: {
        fontSize: 26,
        color: "blue",
        textAlign: "center",
        marginVertical: 20,
    },
    heading: {
        fontSize: 32,
        textAlign: "center",
        color: "green",
        marginVertical: 25,
    },
    userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: "nowrap",
        marginBottom: 10,
    },
    userPicContainer: {
        width: 40,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postCatType: {
        flexDirection: 'row'
    },
    postCatTypeTitle: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
        borderColor: colors.primary,
        marginHorizontal: 2,
    },
    containerReview: {
        marginVertical: 6,
    }

});

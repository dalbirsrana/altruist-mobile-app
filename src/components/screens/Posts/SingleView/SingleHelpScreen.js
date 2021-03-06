import React, {useEffect, useState} from 'react'
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import API from "../../../../services/api"
import PostViewViewPage from "../View/PostViewViewPage";
import Loading from "../../../../common/Loading";
import {windowWidth} from "../../../../utils/Dimensions";


const SingleHelp = ({route, navigation}) => {

    const {postId, postTitle} = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingFailed, setLoadingFailed] = useState(false);

    const getPost = async () => {
        try {
            let P = await API.Post.single(postId);
            if (P !== undefined && P.success) {
                // console.log(P.data);
                setLoading(false);
                setPost(P.data);
            } else {
                setLoading(false);
                setLoadingFailed(true);
            }
        } catch (e) {
            setLoadingFailed(true);
            setLoading(false);
            console.error(e);
        }
    };

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            getPost();
        }
        return () => {
            isUnMount = true;
        }
    }, []);

    const removeItem = (id) => {
        navigation.navigate('Home');
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: postTitle,
        });
    }, [postTitle]);

    return (
        <ScrollView style={styles.container}

                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => {
                            getPost();
                        }}/>
                    }

        >
            {
                loading ? <Loading/> :
                    <View style={{display: "flex", flex: 1}}>
                        {loadingFailed ?
                            <Text style={styles.textColour2}>Something went wrong! Please try again later!</Text>
                            :
                            <View style={{flex: 1}}>
                                {post !== null ?
                                    <PostViewViewPage dataProp={post} removeItem={(id) => removeItem(post.id)}/> :
                                    <Loading/>}
                            </View>
                        }
                    </View>
            }
        </ScrollView>
    )
}

export default SingleHelp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textColour2: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 20,
        color: 'red',
        textAlign: "left",
        width: windowWidth
    },
});
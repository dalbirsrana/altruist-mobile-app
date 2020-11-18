import React, {useState, useEffect} from 'react'
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import API from "../../../../services/api"
import PostViewHome from "../View/PostViewHome";
import Loading from "../../../../common/Loading";
import colors from "../../../../colors/colors";
import {windowWidth} from "../../../../utils/Dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";


const SingleHelp = ({route, navigation}) => {

    const {postId, postTitle} = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingFailed, setLoadingFailed] = useState(false);

    const getPost = async () => {
        try {
            let P = await API.Post.single(postId);
            if (P !== undefined && P.success) {
                console.log(P.data);
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
        <View style={styles.container}>
            {
                loading ? <Loading/> :
                    <View style={{display: "flex",flex: 1}}>
                        {loadingFailed ?
                            <Text style={styles.textColour2}>Something went wrong! Please try again later!</Text>
                            :
                            <View style={{flex: 1}}>
                                {post !== null ?
                                    <PostViewHome dataProp={post} removeItem={(id) => removeItem(post.id)}/> :
                                    <Loading/>}
                            </View>
                        }
                    </View>
            }
        </View>
    )
}

export default SingleHelp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
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
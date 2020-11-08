import React, {useState, useEffect} from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import API from "../../services/api"


const SingleHelp = ( {route, navigation} ) => {

    const { postId } = route.params;
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            let P = await API.Post.single(postId);
            if (P !== undefined) {
                // setLoading(false);
                setPost(P.data);
            }
        } 
        catch(e) {
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

    const { city_name, title, description, postUploads } = post;


return (
    <View style={styles.container}>
        <View>
            <Text>Single Post</Text>
            
            <Button 
            title="Open Drawer"
            onPress={() => navigation.navigate('Home')}/>

        </View>
      
        
        <View>
            <Text>
                Post: { description }
            </Text>

            <Text>
                city Name: {city_name }
            </Text>

            <Text>    
                title: {title }
            </Text>

            <Text>
                post uploads:
            </Text> 

            { Array.isArray(postUploads) 
            ? 
            <Image 
                source={{uri: postUploads[0]}} 
                style={{height: 300, width: 300}} 
            /> 
            : 
            <Text>No Image</Text>
            }
            
        </View>


    </View>
)
}

export default SingleHelp

// data:
// city_name: "Jawahar Nagar, Bharatpur"
// created_at: 1604704996
// description: " cje hjw jbcwbeciwe"
// id: 13
// postCategory: {id: 1, title: "Food Supplies", key: "food-supplies", image_title: "Image Title", s3_path: "https://altruist-project.s3.us-west-2.amazonaws.com/qzl9n7uPbZLdF6D7FLH6aVsqx3FL3dDW", …}
// postType: {id: 1, title: "Help Needed", key: "help-needed", image_title: "V5mgVVbEfrg5Den0BoqCBn2GBk1lqmEg", s3_path: "https://altruist-project.s3.us-west-2.amazonaws.com/V5mgVVbEfrg5Den0BoqCBn2GBk1lqmEg", …}
// postUploads: (2) ["https://altruist-project.s3.us-west-2.amazonaws.com/nv4gJf9jRIkyQiMAnkz6JYp7qWIvJ_iE", "https://altruist-project.s3.us-west-2.amazonaws.com/s2_czmWH8r4ZBWj6gmuhS0G8HRBe-NDk"]
// post_location: {lat: null, lang: null}
// status: 1
// title: "jashvh jewbfwe jbwe"
// updated_at: 1604704996
// user: {firstName: "Palakdeep", lastName: "Kaur", fullName: "Palakdeep Kaur", profile_picture: null, helps_provided: 0, …}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
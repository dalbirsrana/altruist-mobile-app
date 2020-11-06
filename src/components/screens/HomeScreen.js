import React, {useContext , useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import API from "../../services/api";
import {AuthContext} from "../navigation/AuthProvider";

import logo from "../../../assets/icon.png";
import colors from "../../colors/colors";
import Loading from "../../common/Loading";

// import FormButton from "../../common/FormButton";
// import InverseButton from "../../common/InverseButton";
// import {windowHeight, windowWidth} from "../../utils/Dimensions";
// import FormButtonSmall from "../../common/FormButtonSmall";

// import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";


const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadPost = async () => {
        let P = await API.Post.list();
        if (P !== undefined ) {
            setLoading(false)
            setPosts(P.data)
            console.log(P.data)
            return true;
        }
    }


    // const isUserSignedOut = () => {
    //     return  typeof user === "undefined" || ( typeof user !== "undefined" && user.isSignout === true );
    // }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount){
            loadPost();
        }
        return () => {
            isUnMount = true;
        }
    }, []);


    return (
        <View style={styles.container}>

            {/* Slider container */}
            <View style={{ height: 250 }}>
                <Image source={logo} style={{width: 200, height: 200}}/>
                <Button title="Looking for help" color="black" accessibilityLabel="looking for help in your area" />

            </View>

            {/* Top Helper container */}
            <View style={{ height: 200 }}>
                <Text>Top Helper's</Text>

            </View>

            {/* Help Posts container */}
            
 

                <View style={{height: 340}}>

                <Text style={{fontSize: 30, marginVertical: 10, borderTopWidth: 1, }}>Help Seeker's</Text>

                <ScrollView>
                { 
                    isLoading 
                    ? 
                    <Loading /> 
                    : 
                    (
                        posts.map(post => (   
                            <TouchableOpacity underlayColor="white" key={post.id} onPress={ ()=> navigation.navigate("SingleHelpScreen") }>
                            <View>
                                <Text style={styles.h2}>{post.title}</Text>
                                <Image source={{uri:post.s3_path}} style={{width: 150, height: 150}} />
                            </View>
                            </TouchableOpacity>
                            
                        ))
                    )
                }
                </ScrollView>
                </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
});

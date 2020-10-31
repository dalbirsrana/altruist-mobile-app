import { Text, View } from "react-native";
import React from "react";
import {AuthContext} from "../navigation/AuthProvider";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../../colors/colors";

export default function TopHelpers(){
    return (

        <View style={styles.topHelpPostList}>
            <View style={styles.topHelperPost}>
                <Image src={ } style={styles.UserProfile} />
                <Text style={styles.userName}> </Text>
                <Image src={} style={styles.postImage} />
                <Text style= {styles.userCollege}></Text>
            </View>

            <View style={styles.topHelperPost}>
            <Image src={ } style={styles.UserProfile} />
            <Text style={styles.userName}> </Text>
            <Image src={} style={styles.postImage} />
            <Text style= {styles.userCollege}></Text>
            </View>
        </View>        
    )
}


const styles = StyleSheet.create({

    topHelpPostList:{
        flex: 1,
        backgroundColor: colors.primary,

    },

    topHelperPost:{

    },



})
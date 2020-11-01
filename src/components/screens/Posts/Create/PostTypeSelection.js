import React from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";


const PostTypeSelection = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight : () => <Text/>,
            headerLeft: () => (
                <View style={{
                    left:20
                }}
                >
                    <TouchableOpacity
                        onPress={() =>
                        {
                            console.log("Click");
                            navigation.navigate( "HomeTabs" )
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 300, height: 300, marginBottom: 60 }}/>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>  navigation.navigate( "PostCategorySelection" , { postTypeIdProp: 1 } ) }
            >
                <Text style={styles.buttonText}>I want to help.</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate( "PostCategorySelection" , { postTypeIdProp: 2 } )  }
            >
                <Text style={styles.buttonText}>I need a help.</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PostTypeSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,
        width: windowWidth / 1.5,
        height: windowHeight / 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
    },
});

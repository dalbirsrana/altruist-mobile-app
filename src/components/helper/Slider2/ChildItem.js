import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {windowWidth} from "../../../utils/Dimensions";
import colors from "../../../colors/colors";
import LoadableImage from "../../../common/LoadableImage";

import {AuthContext} from "../../navigation/AuthProvider";

export default function ChildItem({
                                      navigation,
                                      item,
                                      style,
                                      onPress,
                                      index,
                                      imageKey,
                                      buttonLable,
                                      local,
                                      height,
                                      active
                                  }) {

    const {user, dispatch} = useContext(AuthContext)

    function stateChanged(user) {
        dispatch(user);
    }

    useEffect(() => {
        return () => {
            stateChanged(user)
        }
    }, [])

    return (

        <View style={styles.container}>
            <LoadableImage
                styleData={[styles.image, style]}
                source={local ? item[imageKey] : {uri: item[imageKey]}}
            />

            <TouchableOpacity style={buttonStyles.buttonContainer}
                              onPress={() => {
                                  // alert('Hi');
                                  (typeof user !== "undefined" && user !== null && !user.isSignout) ?
                                      navigation.navigate('CreatePost') :
                                      navigation.navigate('SignIn')
                              }}
            >
                <Text style={buttonStyles.buttonText}
                >{item[buttonLable]}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        position: 'relative',
        height: 230
    },
    image: {
        width: windowWidth,
        resizeMode: 'stretch',
        height: 230
    },
    button: {
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        position: 'absolute',
        top: 10,
        left: 10
    }
});

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        marginBottom: 20,
        width: windowWidth / 2.5,
        height: 'auto',
        borderColor: colors.primary,
        backgroundColor: colors.transparent,
        borderWidth: 2,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: colors.white,
    },
});
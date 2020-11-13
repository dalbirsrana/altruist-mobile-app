import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {windowHeight, windowWidth} from "../../../utils/Dimensions";
import styled from 'styled-components/native'
import colors from "../../../colors/colors";
import {color} from "react-native-reanimated";
import LoadableImage from "../../../common/LoadableImage"

const StyledTextButton = styled.Button`
  color: red;
  background-color: blue;
  font-size: 10px;
  margin: 10px;
  padding: 0.25px 1px;
  border: 2px solid palevioletred;
  border-radius: 3px;
`


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
    return (

        <View style={styles.container}>
            <LoadableImage
                styleData={[styles.image, style]}
                source={local ? item[imageKey] : {uri: item[imageKey]}}
            />
            <TouchableOpacity style={buttonStyles.buttonContainer}
                              onPress={()=>{
                                  console.log( navigation );
                                  navigation.navigate('CreatePost');
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
        top:10,
        left:10
    }
});

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom:20,
        marginBottom: 20,
        width: windowWidth / 2.5,
        height: 'auto',
        borderColor: colors.primary,
        backgroundColor: colors.transparent,
        borderWidth:2,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 4,
    },
    buttonText: {
        fontWeight:'bold',
        fontSize: 12,
        color: colors.white,
    },
});
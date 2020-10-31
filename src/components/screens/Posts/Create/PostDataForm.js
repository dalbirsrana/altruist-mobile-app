import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import FormInput from "../../../../common/FormInput";

const PostDataForm = ({navigation, titleProp = "" , descriptionProp = "" }) => {


    const [title, setTitle] = useState( titleProp );
    const [description, setDescription] = useState( descriptionProp );
    const [errors, setErrors] = useState({});

    function isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }

    const useEffect = ( () => {
        console.log( errors );
    });


    let errorList = [] ;
    for( const property in errors ){
        var singleAttributeErrors = errors[property];
        for (var i = 0; i < singleAttributeErrors.length; i++){
            errorList.push(<Text>{singleAttributeErrors[i]}</Text>);
        }
    }


    
    return (
        <View style={styles.container}>


            { errorList.length > 0 ?
                <View>
                    {errorList}
                </View>
                : null
            }


            <FormInput
                value={title}
                placeholderText="Title"
                onChangeText={( value ) => setTitle( value )}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
            />

            <FormInput
                value={description}
                placeholderText="Description"
                onChangeText={( value ) => setDescription( value )}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormButton
                buttonTitle="Next"
                onPress={() => {}}
            />


        </View>
    )
}

export default PostDataForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    para: {
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        textAlign: "center",
        marginVertical: 30,
    },
});

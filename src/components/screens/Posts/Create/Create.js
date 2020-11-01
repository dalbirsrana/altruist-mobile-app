import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import PostCategorySelection from "./PostCategorySelection";
import PostTypeSelection from "./PostTypeSelection";
import PostDataForm from "./PostDataForm";

const Create = ({navigation}) => {

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");

    const [postTypeId, setPostTypeId] = useState("");
    const [postCategoryId, setPostCategoryId] = useState("");


    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("");
    const [lat, setLat] = useState("");
    const [lang, setLang] = useState("");
    const [uploads, setUploads] = useState([]);


    const [setpOne, setStepOne] = useState(false );
    const [setpTwo, setStepTwo] = useState(false );
    const [setpThree, setStepThree] = useState(false );
    const [setpFour, setStepFour] = useState(false );
    const [setpFive, setStepFive] = useState(false );


    function goBack( step ){
        switch ( step ) {
            case 1:
                setStepOne(false);
                break;
            case 2:
                setStepTwo(false);
                break;
            case 3:
                setStepThree(false);
                break;
            case 4:
                setStepFour(false);
                break;
        }
    }

    return (
        <View style={styles.container}>

            { setpOne === false ? <PostTypeSelection back={() => { navigation.pop() }}  selection={( value ) => {  setPostTypeId( value ); setStepOne(true); } } /> : null }
            { setpTwo === false && setpOne === true ? <PostCategorySelection back={() => goBack(1) } selection={( value ) => { setPostCategoryId( value ); setStepTwo(true); }} /> : null }
            { setpThree === false && setpTwo === true ? <PostDataForm back={() => goBack(2) }  selection={( value ) => setPostCategoryId( value )} /> : null }


        </View>
    )
}

export default Create;

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

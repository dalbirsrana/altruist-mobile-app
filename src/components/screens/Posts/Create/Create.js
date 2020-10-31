import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import PostCategorySelection from "./PostCategorySelection";

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


    return (
        <View style={styles.container}>

            <PostCategorySelection />

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

import React, { useState, useEffect } from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import logo from "../../../../../assets/icon.png";

const PostCategorySelection = ({navigation, selection}) => {

    const [catList, setCatList] = useState([]);

    useEffect(() => {
        async function getCatList( ){
            let catListData = await API.PostCategories.list();
            if( catListData.success === true ){
                console.log( catListData.data );
                setCatList( catListData.data );
            }
        }
        getCatList();
    } , [] );

    return (
        <View style={styles.container}>
            { catList.map( function ( cat ) {
                return (
                    <TouchableOpacity style={styles.catBox}  onPress={() => selection( cat.id )}   key={cat.key}  >
                        <View >
                            <Image source={cat.s3_path} style={{width: 100, height: 100}}/>
                            <BR/>
                            <Text style={styles.textColour} >{cat.title}</Text>
                        </View>
                    </TouchableOpacity>
                 )
            } ) }
        </View>
    )
}

export default PostCategorySelection;

const styles = StyleSheet.create({
    headerViewText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
    },
    headerView: {
        backgroundColor: "rgb(232, 155, 141)",
        minHeight:50,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "100%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    catBox: {
        flexBasis: "33%",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    textColour: {
        fontSize: 14,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(232, 155, 141)",
        textAlign: "center",
    },
});

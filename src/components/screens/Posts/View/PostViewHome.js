import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../../navigation/AuthProvider";
import BR from "../../../helper/BR";
import FileUploadExampleScreen from "../../FileUploadExampleScreen";
import ScaledImage from "../../../../common/ScaledImage";
import FormButtonSmall from "../../../../common/FormButtonSmall";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import API from "../../../../services/api";


export default function PostViewHome ({navigation, route , dataProp }){

    const {user, logout} = useContext(AuthContext);

    const [catList, setCatList] = useState([]);
    const [data, setData] = useState( dataProp );

    async function getCatList( ){
        let list = await AsyncStorageHelper.getCatList();
        if( Array.isArray( list ) ){
            setCatList( list );
        }else{
            let catListData = await API.PostCategories.list();
            if( catListData.success === true ){
                setCatList( catListData.data );
                AsyncStorageHelper.setObjectValue( 'catList' ,catListData.data );
            }else if (  catListData.success === false && catListData.tokenExpired === true  ){
                logout();
            }
        }
    }

    useEffect(() => {

        let isUnMount = false;
        if( !isUnMount  ){
            getCatList();
        }
        return () => {
            isUnMount = true ;
        }

    } ,  [] );


    return (
        <ScrollView style={styles.container}>


            <View style={styles.imgContainer}>
                { catList.map( function ( cat , index) {
                    return (
                        cat.id === data.post_category_id ?
                            <View  key={index} >
                                <Image source={ {uri:cat.s3_path} } style={{width: 150, height: 150, marginBottom:15}}/>
                                <Text style={styles.textColour} >{cat.title}</Text>
                            </View> : null
                    )
                } ) }
            </View>


            <BR/>

            <View style={styles.containerReview} >

                <Text style={styles.textColour} >Title</Text>
                <Text style={styles.containerReviewHeader} >{data.title}</Text>
                <BR/>

                <Text style={styles.textColour} >Description</Text>
                <Text style={styles.containerReviewHeader} >{data.description}</Text>
                <BR/>

                <Text style={styles.textColour} >Location</Text>
                <Text style={styles.containerReviewHeader} >{data.city_name}</Text>
                <BR/>

            </View>

            <BR/>
            <BR/>

            { data.postUploads.map( function ( upload , index ) {
                console.log( "Test check Review" );
                console.log( upload );
                return (
                        <View  key={index} style={styles.catBox2} >
                            <View  style={styles.imgContainer2} >
                                <Image style={styles.img2}  source={{uri:upload}} />
                            </View>
                        </View>
                )
            } ) }


        </ScrollView>
    )
}

const styles = StyleSheet.create({

    containerReview : {
        display: "flex",
        height: 100,
        margin:20,
        marginTop: 10,
        marginBottom: 10,
        width:windowWidth-40,
        textAlign:'left',

        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf:"flex-start",

    },


    containerReviewHeader : {
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(16,14,14)",
        textAlign: "center",

    },


    layoutContainer : {
        display: "flex",
        height: 100,
        margin:20,
        marginTop: 10,
        marginBottom: 10,
        width:windowWidth-40,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
    },
    imgContainer: {
        flexBasis: "100%",
        flex: 1,
        height: 170,
        backgroundColor: colors.white,
        textAlign: "center",
        marginBottom: 20,
        marginTop:20,
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf:"center",
    },
    catBox: {
        flexBasis: "100%",
        height:150,
        backgroundColor: colors.white,
        alignItems: "center",
        alignSelf:"center",
        justifyContent: "center",
        textAlign: "center",
    },
    textColour: {
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(232, 155, 141)",
        textAlign: "center",
    },
    textColour2: {
        marginTop:10,
        marginLeft:20,
        fontSize: 20,
        color: "rgb(232, 155, 141)",
        textAlign: "left",
        width: windowWidth-40
    },
    errorLabel: {
        marginLeft:0,
        fontSize: 16,
        color: "rgb(232, 155, 141)",
        textAlign: "left"
    },


    input: {
        padding: 15,
        marginBottom: 10,
        marginLeft: 20 ,
        marginTop: 20 ,
        width: windowWidth-40,
        fontSize: 16,
        borderRadius: 8,
        borderColor: colors.black,
        borderWidth: 1,
    },


    img2 : {
        borderRadius:20,
        width:"100%",
        height:250
    },
    catBox2: {
        height: 350,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 15,
        overflow:'hidden'
    },
    imgContainer2: {
        borderRadius: 20,
        width: windowWidth-40,
        margin:10,
        height: 250,
        borderWidth: 0,
        backgroundColor: colors.white,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"flex-start",
    },

});

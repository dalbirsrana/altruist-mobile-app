import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";
import BR from "../../../helper/BR";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import API from "../../../../services/api";

import FlatListSlider from './../../../helper/Slider/FlatListSlider';



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


    const screenWidth = Math.round(windowWidth);

    function getImagesArray(){
        let imageArray = [] ;
        data.postUploads.map( function ( upload , index ) {
            imageArray.push( {
                image : upload ,
                desc : data.title
            } );
        });
        return imageArray;
    }

    return (
        <ScrollView style={styles.container}>


            <Text style={styles.textColourName} >{data.user.fullName} {data.postType.title === "Help Needed" ? "wants help" : "want to help"}</Text>

            <View style={styles.imgContainerSmall}>
                { catList.map( function ( cat , index) {
                    return (
                        cat.id === data.postCategory.id ?
                            <View  style={styles.catBox}  key={index} >
                                <Image source={ {uri:cat.s3_path} } style={{width: 35, height: 35, marginBottom:5}}/>
                                <Text style={{ ...styles.textColour , fontSize:12   }} >{cat.title}</Text>
                            </View> : null
                    )
                } ) }
            </View>


            <BR/>

            <View style={styles.containerReview} >

                <Text style={{ ...styles.textColour , textAlign:"left" , marginBottom: 10 , fontWeight: "normal" }} >{data.title}</Text>
                <Text style={{ ...styles.containerReviewHeader , textAlign:"left" , marginBottom: 10 ,  fontSize:14 }} >{data.description}</Text>
                <Text style={{ ...styles.textColour, textAlign:"left" ,  fontSize:10 }} >{data.city_name}</Text>
                <BR/>

            </View>

            <BR/>
            <BR/>

            <FlatListSlider
                data={getImagesArray()}
                timer={100}
                imageKey={'image'}
                local={false}
                width={screenWidth}
                separator={0}
                loop={false}
                autoscroll={false}
                currentIndexCallback={index => console.log('Index', index)}
                indicator
                animation
            />


        </ScrollView>
    )
}

const styles = StyleSheet.create({

    containerReview : {
        display: "flex",
        height: 100,
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
        margin:20,
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
    imgContainerSmall: {
        flexBasis: "100%",
        flex: 1,
        height: 50,
        marginTop:20,
        backgroundColor: colors.white,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
    },
    catBox: {
        flexBasis: "100%",
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
    textColourName: {
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        color: "rgb(232, 155, 141)",
        textAlign: "left",
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

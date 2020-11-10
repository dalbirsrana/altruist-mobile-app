import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";
import BR from "../../../helper/BR";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import API from "../../../../services/api";
import { useNavigation } from '@react-navigation/native';

import FlatListSlider from './../../../helper/Slider/FlatListSlider';
import postImage from "../../../../../assets/user-avatar.png";

import styled from 'styled-components/native'
import LoadableImage from "../../../../common/LoadableImage";
const StyledTextButton = styled.Text`
  color: palevioletred;
  background-color: transparent;
  font-size: 10px;
  margin: 5px 5px 5px 0;
  padding: 2.5px;
  border: 1px solid palevioletred;
  border-radius: 10px;
  width:100px;
  text-align:center;
  text-transform:capitalize;
  display: inline;
`

const StyledTextButton2 = styled(StyledTextButton)`
  width:150px;
`




export default function PostViewHome ({ route , dataProp , key , dataKey }){
    
    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState( dataProp );

    useEffect(() => {
        let isUnMount = false;
        if( !isUnMount  ){
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
        <ScrollView style={[styles.container,{backgroundColor: dataKey%2===0 ? colors.primaryTransparent : colors.secondaryTransparent }]}>
            <TouchableOpacity onPress={()=>{navigation.navigate('SingleHelpScreen', { postId: data.id })}}>

                <View style={styles.userContainer} >
                    <View style={styles.userPicContainer} >
                        {
                            data.user.profile_picture ?
                                <LoadableImage
                                    source={{uri:data.user.profile_picture}} styleData={{width:30,height:30,borderRadius:15}} />
                                :
                                <LoadableImage
                                    source={postImage} styleData={{width:30,height:30,borderRadius:15}} />
                        }
                    </View>
                    <Text style={styles.userName} >{data.user.fullName}</Text>
                </View>

                <View style={styles.tagsContainer} >
                    <Text style={styles.tag}  >{data.postType.title === "Help Needed" ? "wants help" : "want to help"}</Text>
                    <Text style={styles.tag}  >{data.postCategory.title}</Text>
                </View>

                <Text style={{ ...styles.locationLabel , textAlign:"left"  }} >{data.city_name}</Text>

                <View style={styles.containerReview}>

                    <Text style={{ ...styles.textColour , textAlign:"left" , marginBottom: 10 , fontWeight: "normal" }} >{data.title}</Text>
                    <Text style={{ ...styles.containerReviewHeader , textAlign:"left" , marginBottom: 10 ,  fontSize:14 }} >{data.description}</Text>

                </View>

                <FlatListSlider
                    style={
                        {
                            width:windowWidth
                        }
                    }
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



            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    tagsContainer:{
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        wrap: "nowrap"
    },
    userContainer:{
        display: "flex",
        flexDirection: "row",
        wrap: "nowrap"
    },
    userPicContainer : {
        width: 35,
        height:30,
        borderRadius:15
    },
    locationLabel : {
        color: "palevioletred",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
    },
    tag : {
        color: "palevioletred",
        backgroundColor: "transparent",
        fontSize: 12,
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor : "palevioletred",
        borderRadius: 10,
        textAlign:"center",
        textTransform:"capitalize",
    },
    containerReview : {
        display: "flex",
        height: "auto",
        marginTop: 10,
        marginBottom: 10,
        width:windowWidth,
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
        marginTop: 10,
        marginBottom: 10,
        width:windowWidth,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        marginBottom: 10,
        padding:10
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
        color: colors.black,
        textAlign: "center",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        color: colors.black,
        textAlign: "left",
        marginTop: 5
    },
    textColour2: {
        marginTop:10,
        marginLeft:20,
        fontSize: 20,
        color: colors.black,
        textAlign: "left",
        width: windowWidth
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
        width: windowWidth,
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
        width: windowWidth,
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

import React, {useContext, useState, useEffect} from "react";
import { useIsFocused } from '@react-navigation/native'
import { StackActions  } from '@react-navigation/native';
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
import getRouteParam from "../../../helper/getRouteParam"
import LoadableImage from "../../../../common/LoadableImage";
import Loading from "../../../../common/Loading";

function isIterableIterator(value) {
    return !!value && typeof value.next === "function" && typeof value[Symbol.iterator] === "function";
}

export default function PostReview ({navigation, route}){

    const {user, logout} = useContext(AuthContext);

    const [id, setId] = useState(  getRouteParam( route , "idProp" , "" ) );
    const [catList, setCatList] = useState([]);

    const [postTypeId, setPostTypeId] = useState(  getRouteParam( route , "postTypeIdProp" , "" ) );
    const [postCategoryId, setPostCategoryId] = useState( getRouteParam( route , "postCategoryIdProp" , "" ) );

    const [title, setTitle] = useState(  getRouteParam( route , "titleProp" , "" )   );
    const [description, setDescription] = useState( getRouteParam( route , "descriptionProp" , "" )  );
    const [errors, setErrors] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [errorList2, setErrorList2] = useState({});

    const [lat, setLat] = useState( getRouteParam( route , "latProp" , "" )  );
    const [lang, setLang] = useState( getRouteParam( route , "langProp" , "" ) );
    const [cityName, setCityName] = useState( getRouteParam( route , "cityNameProp" , "" ) );

    const [uploadsObj, setUploadsObj] = useState(getRouteParam( route , "uploadsObjProp" , [] )  );

    const [inProcess, setInProcess] = useState(false);


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
                            navigation.navigate( "PostUploads" , {

                                idProp: id,
                                postTypeIdProp: postTypeId ,
                                postCategoryIdProp: postCategoryId ,

                                titleProp: title ,
                                descriptionProp: description ,
                                cityNameProp: cityName ,
                                latProp: lat ,
                                langProp: lang ,

                                uploadsObjProp : uploadsObj

                            } )
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const submitForm = async () => {

        setInProcess( true );
        let PostUploads = [] ;
        uploadsObj.map(function ( upload ) {
            PostUploads.push( upload.key );
        });

        if( (id === null || id === "") ){
            console.log( "CreatePost" );
            let createPost = await API.Post.create({
                title: title,
                post_type_id : postTypeId ,
                post_category_id : postCategoryId ,
                description : description ,
                lat : lat,
                lang: lang,
                PostUploads : PostUploads,
                city_name : cityName
            });
            if( createPost && createPost.success ){
                // console.log( 'HomeStack navigate' , createPost.data.id );
                setInProcess( false );

                navigation.navigate( 'Create', { postCreatedProp:true , postCreatedIdProp:createPost.data.id } );
                //navigation.dispatch(replaceAction);

            }else{
                let string = "Please try again later there is some error.";
                //let string = JSON.parse( createPost );
                setErrorList( [<Text style={styles.errorLabel} key={0} >{string}</Text>] );
                setInProcess( false );
            }

        }else{
            let createPost = await API.Post.update( id,{
                title: title,
                post_type_id : postTypeId ,
                post_category_id : postCategoryId ,
                description : description ,
                lat : lat,
                lang: lang,
                PostUploads : PostUploads,
                city_name : cityName
            });

            if( createPost && createPost.success ){
                // console.log( 'HomeStack navigate' , createPost.data.id );
                setInProcess( false );

                navigation.navigate( 'Create', { postCreatedProp:true , postCreatedIdProp:createPost.data.id } );
                //navigation.dispatch(replaceAction);

            }else{
                let string = "Please try again later there is some error.";
                //let string = JSON.parse( createPost );
                setErrorList( [<Text style={styles.errorLabel} key={0} >{string}</Text>] );
                setInProcess( false );
            }
        }
    }

    function setErrorsInStart() {
        let errorListVar = [] ;
        for( const property in errors ){
            var singleAttributeErrors = errors[property];
            for (var i = 0; i < singleAttributeErrors.length; i++){
                errorListVar.push(<Text style={styles.errorLabel} >{singleAttributeErrors[i]}</Text>);
            }
        }
        setErrorList( errorListVar ) ;
    }

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

    } ,  [ navigation ] );

    return (
        <ScrollView style={styles.container}>

            { errorList.length > 0 ?
                <View style={styles.layoutContainer}>
                    {errorList}
                </View>
                : null
            }

            <View style={styles.imgContainer}>
                { catList.map( function ( cat , index) {
                    return (
                        cat.id === postCategoryId ?
                            <View  key={index} >
                                <View style={{width: 100, height: 100, marginBottom:15}}>
                                    <LoadableImage
                                        styleData = {[{width: 100, height: 100, marginBottom:15}]}
                                        source={{uri:cat.s3_path}}
                                    />
                                </View>
                                <Text style={styles.textColour} >{cat.title}</Text>
                            </View> : null
                    )
                } ) }
            </View>


            <BR/>

            <View style={styles.containerReview} >

                <Text style={styles.textColour} >Title</Text>
                <Text style={styles.containerReviewHeader} >{title}</Text>

                <Text style={styles.textColour} >Description</Text>
                <Text style={styles.containerReviewHeader} >{description}</Text>

                <Text style={styles.textColour} >Location</Text>
                <Text style={styles.containerReviewHeader} >{cityName}</Text>

            </View>

            { uploadsObj.reverse().map( function ( upload , index ) {
                return (
                    <View  key={index} style={styles.catBox2} >
                        <View  style={styles.imgContainer2} >
                            <LoadableImage
                                styleData = {[styles.img2]}
                                source={{uri:upload.objectUrl}}
                            />
                        </View>
                    </View>
                )
            } ) }

            {  inProcess ?
                <Loading />
                :
                <FormButtonSmall loadingProp={false} buttonTitle={ ( id === null || id === "" ) ? "Create Post" : "Edit Post" }  align={"right"} onPress={()=> submitForm()}  />
            }



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
        marginBottom:10
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
        height: 100,
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
        width: windowWidth-40,
        height:250
    },
    catBox2: {
        marginTop:30,
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

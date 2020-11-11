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



export default function PostUploads ({navigation, route}){

    const {user, logout} = useContext(AuthContext);

    const [postTypeId, setPostTypeId] = useState( route.params.postTypeIdProp );
    const [postCategoryId, setPostCategoryId] = useState(route.params.postCategoryIdProp );

    const [title, setTitle] = useState(  route.params.hasOwnProperty('titleProp') ?  route.params.titleProp : ""  );
    const [description, setDescription] = useState( route.params.hasOwnProperty('descriptionProp') ?  route.params.descriptionProp : "" );
    const [errors, setErrors] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [errorList2, setErrorList2] = useState({});

    const [lat, setLat] = useState(route.params.hasOwnProperty('latProp') ?  route.params.latProp : "");
    const [lang, setLang] = useState(route.params.hasOwnProperty('langProp') ?  route.params.langProp : "");
    const [cityName, setCityName] = useState(route.params.hasOwnProperty('cityNameProp') ?  route.params.cityNameProp : "");

    const [uploadsObj, setUploadsObj] = useState(route.params.hasOwnProperty('uploadsObjProp') ? route.params.uploadsObjProp : [] );

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
                            navigation.navigate( "PostDataForm" , {
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

        let pObject = await uploadsObj;

        if( pObject.length > 0 ){
            await navigation.navigate( 'PostReview' , {

                postTypeIdProp: postTypeId ,
                postCategoryIdProp: postCategoryId ,

                titleProp: title ,
                descriptionProp: description ,
                cityNameProp: cityName ,
                latProp: lat ,
                langProp: lang,

                uploadsObjProp: pObject

            } );
        }

    }

    useEffect(() => {
    } ,  [] );

    const removeItem = async ( url ) => {
        let newUploadsObj = [] ;
        uploadsObj.reverse().map( function ( upload , index ) {
            if( upload.objectUrl !== url ){
                newUploadsObj.push( upload );
            }
        });
        setUploadsObj( newUploadsObj );
    }

    return (
        <ScrollView style={styles.container}>

            <View  style={styles.catBox2} >
                <View  style={styles.imgContainer2} >
                    <FileUploadExampleScreen location={"PostUpload"} imageUploaded={( event ) => {  setUploadsObj(oldArray => [...oldArray, event]);   }}  />
                </View>
            </View>
            <BR/>

            { uploadsObj.reverse().map( function ( upload , index ) {
                return (
                    <View  key={index} style={styles.catBox} >
                        <FormButtonSmall  buttonTitle={"X"}  align={"right"} onPress={()=> removeItem( upload.objectUrl )}  />
                        <View  style={styles.imgContainer} >
                            <Image style={styles.img}  source={{uri:upload.objectUrl}} />
                        </View>
                    </View>
                )
            } ) }

            { uploadsObj.length > 0 ?
                <FormButtonSmall  buttonTitle={"Review"}  align={"right"} onPress={()=> submitForm()}  />
            : null }

            <BR/>
            <BR/>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    catBox2: {
        height: 50,
        padding:10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center",
    },
    img : {
        borderRadius:20,
        width:"100%",
        height:250
    },
    catBox: {
        height: 350,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 15,
        overflow:'hidden'
    },
    imgContainer: {
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
    imgContainer2: {
        borderRadius: 20,
        width: windowWidth-40,
        height: 50,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"flex-start",
    },
    container: {
        backgroundColor:colors.white,
        width: windowWidth,
        padding:10,
        paddingTop:20,
        display:"flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    }
});

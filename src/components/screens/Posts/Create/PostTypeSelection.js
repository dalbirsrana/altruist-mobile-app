import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../../navigation/AuthProvider";
import getRouteParam from "../../../helper/getRouteParam"
import LoadableImage from "../../../../common/LoadableImage";


const PostTypeSelection = ({ navigation , route}) => {

    let idProp = getRouteParam( route , "idProp" , "" );
    let postTypeIdProp = getRouteParam( route , "postTypeIdProp" , "" );
    let postCategoryIdProp = getRouteParam( route , "postCategoryIdProp" , "" ) ;
    let titleProp = getRouteParam( route , "titleProp" , "" ) ;
    let descriptionProp = getRouteParam( route , "descriptionProp" , "" );
    let latProp = getRouteParam( route , "latProp" , "" );
    let cityNameProp = getRouteParam( route , "cityNameProp" , "" );
    let langProp = getRouteParam( route , "langProp" , "" );
    let uploadsObjProp = getRouteParam( route , "uploadsObjProp" , [] );

    const [id, setId] = useState(  idProp );

    const [catList, setCatList] = useState([]);
    const [postTypeId, setPostTypeId] = useState( postTypeIdProp  );
    const [postCategoryId, setPostCategoryId] = useState( postCategoryIdProp );

    const [title, setTitle] = useState(titleProp);
    const [description, setDescription] = useState(  descriptionProp );
    const [errors, setErrors] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [errorList2, setErrorList2] = useState({});

    const [lat, setLat] = useState( latProp );
    const [lang, setLang] = useState( langProp );
    const [cityName, setCityName] = useState(cityNameProp );

    const [uploadsObj, setUploadsObj] = useState( uploadsObjProp  );

    function move( forward , postTypeIdSelected = null  ){
        if( !forward ){
             navigation.navigate( "HomeStack" );
        }else{
            navigation.navigate(  "PostCategorySelection" , {

                idProp: id,

                postTypeIdProp: postTypeIdSelected ,
                postCategoryIdProp: postCategoryId ,

                titleProp: title ,
                descriptionProp: description ,
                cityNameProp: cityName ,
                latProp: lat ,
                langProp: lang ,

                uploadsObjProp : uploadsObj
            });
        }
    }

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
                            move( false );
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [ navigation ]);

    useEffect(() => {
        setId( idProp );
        setPostTypeId( postTypeIdProp );
        setPostCategoryId( postCategoryIdProp );
        setTitle( titleProp );
        setDescription( descriptionProp );
        setLat( latProp );
        setLang( langProp );
        setCityName( cityNameProp );
        setUploadsObj( uploadsObjProp );

    } , [ navigation , route.params  ] );

    return (
        <View style={styles.container}>

            <LoadableImage
                styleData = {[{width: 300, height: 300, marginBottom: 60, marginTop: 60 }]}
                source={logo}
            />

            <TouchableOpacity
                style={{ ...styles.button , backgroundColor: ( postTypeId === 1 ) ? colors.secondaryBold  : colors.secondary  }}
                onPress={
                    async ( event ) => {
                        await setPostTypeId( 1 );
                        move( true , 1);
                    }
                }
            >
                <Text style={styles.buttonText}>I need a help.</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ ...styles.button , backgroundColor: ( postTypeId === 2 ) ? colors.secondaryBold : colors.secondary  }}
                onPress={
                    async ( event ) => {
                        await setPostTypeId( 2 );
                        move( true , 2 );
                    }
                }
            >
                <Text style={styles.buttonText}>I want to help.</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PostTypeSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,
        width: windowWidth / 1.5,
        height: windowHeight / 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
    },
});

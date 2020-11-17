import React, {useContext, useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../../navigation/AuthProvider";
import getRouteParam from "../../../helper/getRouteParam"


const PostTypeSelection = ({ navigation , route}) => {

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

    function move( forward , postTypeIdSelected = null  ){
        if( !forward ){
             navigation.navigate( "HomeStack" );
        }else{
            navigation.navigate(  "PostCategorySelection" , {
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
    }, [navigation]);

    return (
        <View style={styles.container}>

            <Image source={logo} style={{width: 300, height: 300, marginBottom: 60 }}/>

            <TouchableOpacity
                style={styles.button}
                onPress={
                    async ( event ) => {
                        await setPostTypeId( 1 );
                        move( true , 1);
                    }
                }
            >
                <Text style={styles.buttonText}>I want to help.</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={
                    async ( event ) => {
                        await setPostTypeId( 2 );
                        move( true , 2 );
                    }
                }
            >
                <Text style={styles.buttonText}>I need a help.</Text>
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

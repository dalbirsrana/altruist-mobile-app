import React, {useContext, useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../../navigation/AuthProvider";
import BR from "../../../helper/BR";
import FileUploadExampleScreen from "../../FileUploadExampleScreen";


export default function PostUploads ({navigation, route}){

    const {user, logout} = useContext(AuthContext);

    const [postTypeId, setPostTypeId] = useState( route.params.postTypeIdProp );
    const [postCategoryId, setPostCategoryId] = useState(route.params.postCategoryIdProp );

    const [title, setTitle] = useState( route.params.titleProp );
    const [description, setDescription] = useState( route.params.titleProp  );

    const [errors, setErrors] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [errorList2, setErrorList2] = useState({});

    const [lat, setLat] = useState(route.params.latProp );
    const [lang, setLang] = useState(route.params.langProp );
    const [cityName, setCityName] = useState(route.params.cityNameProp );

    const [uploads, setUploads] = useState([]);
    const [uploadsObj, setUploadsObj] = useState([]);

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
                                langProp: lang

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

    function addNew(){
        uploadsObj.push( data );
        setUploadsObj( uploadsObj );

        uploads.push( data['key'] );
        setUploads( uploads );
    }

    return (
        <View style={styles.container}>

            { uploads.map( function ( upload , index ) {
                return (
                    <View  key={index} style={styles.catBox} >
                        <View  style={styles.imgContainer} >
                            <Image source={upload.objectUrl} style={{width: 100, height: 100}}/>
                        </View>
                    </View>
                )
            } ) }

            <View  style={styles.catBox} >
                <View  style={styles.imgContainer} >
                    <FileUploadExampleScreen imageUploaded={( data ) => { addNew( data ) }}  />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    catBox: {
        flexBasis: "50%",
        alignItems: "center",
        padding:10,
        minHeight:100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        borderRadius: 20,
        height: windowHeight/4,
        width:'100%',
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        alignSelf:"center",
    },
    container: {
        backgroundColor:colors.white,
        width: windowWidth,
        minHeight: '100%',
        height:'fit-content',
        padding:10,
        display:"flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyItems: "flex-start",
        justifyContent: "flex-start",
    }
});

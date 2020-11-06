import React, {useState, useEffect, useContext} from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import logo from "../../../../../assets/icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import {windowHeight} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";

const PostCategorySelection = ({navigation, route }) => {

    const {user, logout} = useContext(AuthContext);

    const [catList, setCatList] = useState([]);
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

    function move( forward , postCategoryIdSelected = null ){
        navigation.navigate( forward ?  "PostDataForm" : "PostTypeSelection" , {
            postTypeIdProp: postTypeId ,
            postCategoryIdProp: postCategoryIdSelected ,

            titleProp: title ,
            descriptionProp: description ,
            cityNameProp: cityName ,
            latProp: lat ,
            langProp: lang ,

            uploadsObjProp : uploadsObj
        })
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
                        onPress={() => move( false ) }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    async function getCatList( ){
        let list = await AsyncStorageHelper.getCatList();
        console.log( "list" , list);
        if( Array.isArray( list ) ){
            setCatList( list );
        }else{
            let catListData = await API.PostCategories.list();
            if( catListData.success === true ){
                console.log( catListData.data );
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

    } , [] );

    return (
        <View style={styles.container}>
            { catList.map( function ( cat , index ) {
                return (

                        <View  key={index} style={styles.catBox}   >
                            <TouchableOpacity style={styles.imgContainer}
                                              onPress={
                                                  async ( event ) => {
                                                      await setPostCategoryId( cat.id );
                                                      move( true , cat.id);
                                                  }
                                              }
                            >
                                <Image source={{uri:cat.s3_path}} style={{width: 100, height: 100, marginBottom:10}}/>
                                <Text style={styles.textColour} >{cat.title}</Text>
                            </TouchableOpacity>
                        </View>

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
        alignItems:"flex-start",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    catBox: {
        flexBasis: "33%",
        height: 130,
        marginTop:10,
        marginBottom:10,
        padding:10,
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
    imgContainer: {
        flex: 1,
        height: windowHeight/4,
        backgroundColor: colors.white,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",

        alignSelf:"center",
    },
});

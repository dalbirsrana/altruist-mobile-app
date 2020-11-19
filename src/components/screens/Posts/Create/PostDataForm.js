import React, {useState, useEffect, useContext} from "react";
import {
    Image,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import InverseButton from "../../../../common/InverseButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import FormInput2 from "../../../../common/FormInput2";
import FormInput from "../../../../common/FormInput";
import FormButtonSmall from "../../../../common/FormButtonSmall";
import FormTextArea from "../../../../common/FormTextArea";
import IconButton from "../../../../common/IconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import logo from "../../../../../assets/Feature_Icons-03.png";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Textarea from 'react-native-textarea';
import getRouteParam from "../../../helper/getRouteParam"
import LoadableImage from "../../../../common/LoadableImage";


const PostDataForm = ({navigation, route}) => {

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

    const [uploadsObj, setUploadsObj] = useState( getRouteParam( route , "uploadsObjProp" , [] )  );

/*
    const [lat, setLat] = useState(route.params.hasOwnProperty('latProp') ? "27.2046" : "27.2046");
    const [lang, setLang] = useState(route.params.hasOwnProperty('langProp') ? "77.4977" : "77.4977");
    const [cityName, setCityName] = useState(route.params.hasOwnProperty('cityNameProp') ? "Argyle Street Vancouver" : "Argyle Street Vancouver");
*/

    useEffect(() => {
        // console.log( "uploadsObjProp" , uploadsObj );
        setUploadsObj( getRouteParam( route , "uploadsObjProp" , [] )  );
    } , [] )

    const submitForm = async () => {

        // console.log( "uploadsObjProp whie submit" , uploadsObj );


        let requiredCheck = {
            "Title": title,
            "Description": description,
            "Location": cityName,
        };

        let errorListVar = {};
        for (const property in requiredCheck) {
            if (requiredCheck[property] === "") {
                errorListVar[property] = <Text style={styles.errorLabel}>{property + " is required."}</Text>;
            }
        }
        setErrorList2(errorListVar)

        if (Object.keys(errorListVar).length === 0 && errorListVar.constructor === Object) {
            // now go to next setp
            navigation.navigate('PostUploads', {

                idProp: id,

                postTypeIdProp: postTypeId,
                postCategoryIdProp: postCategoryId,

                titleProp: title,
                descriptionProp: description,
                cityNameProp: cityName,
                latProp: lat,
                langProp: lang,

                uploadsObjProp: uploadsObj

            });
        }
    }

    function isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }

    function error(err) {
        setLat("");
        setLang("");
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function findCurrentLocation() {
        setLat("FETCHING");
        setLang("FETCHING");
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);
                setLat(latitude);
                setLang(longitude);

                // console.log( "lat", "lang" );
                //  // console.log( lat, lang );

                let cityData = await API.Post.getCityName({
                    lat: position.coords.latitude,
                    lang: position.coords.longitude
                });
                // console.log( cityData  );
                if (cityData.success === true) {
                    // console.log( cityData  );
                    setCityName(cityData.data.city_name);
                    errorList['Location'] = "";
                    setErrorList(errorList);
                } else if (cityData.success === false && cityData.tokenExpired === true) {
                    logout(cityData.data.message);
                }

            },
            error,
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    async function getCatList() {
        let list = await AsyncStorageHelper.getCatList();
        // console.log( "list" , list);
        if (Array.isArray(list)) {
            setCatList(list);
        } else {
            let catListData = await API.PostCategories.list();
            if (catListData.success === true) {
                // console.log( catListData.data );
                setCatList(catListData.data);
                AsyncStorageHelper.setObjectValue('catList', catListData.data);
            } else if (catListData.success === false && catListData.tokenExpired === true) {
                logout();
            }
        }
    }

    useEffect(() => {

        let isUnMount = false;
        if (!isUnMount) {
            getCatList();
        }
        return () => {
            isUnMount = true;
        }

    }, []);


    function setErrorsInStart() {
        let errorListVar = [];
        for (const property in errors) {
            var singleAttributeErrors = errors[property];
            for (var i = 0; i < singleAttributeErrors.length; i++) {
                errorListVar.push(<Text style={styles.errorLabel}>{singleAttributeErrors[i]}</Text>);
            }
        }
        setErrorList(errorListVar);
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: postTypeId === 1 ? "I want to help!" : "I need help!",
            headerRight: () => <Text/>,
            headerLeft: () => (
                <View style={{
                    left: 20
                }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PostUploads', {

                                idProp: id,

                                postTypeIdProp: postTypeId,
                                postCategoryIdProp: postCategoryId,

                                titleProp: title,
                                descriptionProp: description,
                                cityNameProp: cityName,
                                latProp: lat,
                                langProp: lang,

                                uploadsObjProp: uploadsObj

                            });
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);


    return (
        <KeyboardAvoidingView style={styles.container}
                              behavior="padding"
        >

            {errorList.length > 0 ?
                <View style={styles.layoutContainer}>
                    {errorList}
                </View>
                : null
            }

            <View style={{marginTop:15}}>
                {catList.map(function (cat, index) {
                    return (
                        cat.id === postCategoryId ?
                            <View key={index} style={{display:"flex"}} >
                                <View style={{width: 100, height: 100, marginBottom: 10,alignSelf:"center"}}>
                                    <LoadableImage
                                        styleData = {[{width: 100, height: 100, marginBottom: 10,alignSelf:"center"}]}
                                        source={{uri:cat.s3_path}}
                                    />
                                </View>
                                <Text style={styles.textColour}>{cat.title}</Text>
                            </View> : null
                    )
                })}
            </View>

            <FormInput2
                value={title}
                placeholderText="Title"
                onChangeText={(value) => setTitle(value)}
                autoCapitalize="none"
                autoCorrect={false}
                error={title === "" && errorList2.hasOwnProperty('Title') && errorList2["Title"] ? errorList2["Title"] : ""}
            />

            <FormTextArea
                value={description}
                placeholderText="Description"
                onChangeText={( value ) => setDescription( value )}
                autoCapitalize="none"
                autoCorrect={false}
                error={ description === "" && errorList2.hasOwnProperty('Description') &&  errorList2["Description"] ? errorList2["Description"] : "" }
            />

            {lat === "" && lang === "" && cityName === "" ?
                <InverseButton onPress={() => findCurrentLocation()} buttonTitle={"Enable Location"}
                               iconName={"edit-location"}/>
                : null
            }

            {lat !== "" && lang !== "" && cityName === "" ?
                <InverseButton buttonTitle={"Fetching Location..."} iconName={"cog"}/>
                : null
            }

            {lat !== "" && lang !== "" && cityName !== "" ?
                <Text style={styles.textColour2}>{"Location :" + cityName}</Text>
                : null
            }

            {cityName === "" && errorList2.hasOwnProperty('Location') && errorList2["Location"] ?
                <Text style={styles.textColour2}>{errorList2["Location"]}</Text>
                : null
            }

            <FormButtonSmall onPress={() => submitForm()} buttonTitle={"Next"} align={"right"}/>

        </KeyboardAvoidingView>
    )
}

export default PostDataForm;

const styles = StyleSheet.create({
    layoutContainer: {
        display: "flex",
        height: "fit-content",
        margin: 20,
        marginTop: 10,
        marginBottom: 10,
        width: windowWidth - 40
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "column",
    },
    imgContainer: {
        flex: 1,
        backgroundColor: colors.white,
        textAlign: "center",
        marginTop: 20,
        alignItems: "center",
        alignSelf: "center",
    },
    catBox: {
        backgroundColor: colors.white,
        alignItems: "center",
        alignSelf: "center",
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
        marginTop: 10,
        marginLeft: 20,
        fontSize: 20,
        color: "rgb(232, 155, 141)",
        textAlign: "left",
        width: windowWidth - 40
    },
    errorLabel: {
        marginLeft: 0,
        fontSize: 16,
        color: "rgb(232, 155, 141)",
        textAlign: "left"
    },
});


const textAreaStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 100,
        padding: 5,
        backgroundColor: 'transparent',
        fontSize: 16,
        borderRadius: 8,
        borderColor: colors.black,
        borderWidth: 1,
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 90,
        fontSize: 14,
        color: '#333',
    },
    errorLabel: {
        width: windowWidth - 40,
        height: 70,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
        color: "rgb(232, 155, 141)",
        textAlign: "left"
    },
});
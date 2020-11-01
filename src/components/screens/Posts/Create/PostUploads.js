import React, {useContext, useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import logo from "../../../../../assets/Feature_Icons-03.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../../navigation/AuthProvider";
import BR from "../../../helper/BR";


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
                            console.log("Click");
                            navigation.navigate( "HomeTabs" )
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

            { uploads.map( function ( upload , index ) {
                return (
                    <View  key={index} style={styles.catBox} >
                        <View  style={styles.imgContainer} >
                            <Image source={upload.objectUrl} style={{width: 100, height: 100}}/>
                        </View>
                    </View>
                )
            } ) }

            <View  key={index} style={styles.imgContainer} >

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    catBox: {
        flexBasis: "50%",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
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
        justifySelf: "center",
        alignSelf:"center",
    },
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

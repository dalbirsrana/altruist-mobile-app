import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../../../../colors/colors";
import PostTypeSelection from "./PostTypeSelection";
import getRouteParam from "../../../helper/getRouteParam";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import Loading from "../../../../common/Loading";

const Create = ({route, navigation}) => {

    const [homeBtn, setHomeBut] = useState("");

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {

        // if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params === "undefined" ){
        //      console.log('Move to home');
        //      console.log( "homeBtn" ,homeBtn );
        //      navigation.navigate( 'HomeStack', { screen : 'Home' , params: route.params }  );
        // }else if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
        //     getRouteParam( navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params , 'postCreatedIdProp' ) ===
        //     getRouteParam( route , 'postCreatedIdProp' )
        // ){
        //     console.log('Move to Create');
        //     return navigation.navigate( 'PostTypeSelection' );
        // }else if( typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
        //     getRouteParam( navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params , 'postCreatedIdProp' ) !==
        //     getRouteParam( route , 'postCreatedIdProp' )
        // ){
        //     console.log( "homeBtn" , homeBtn );
        //     console.log('Move to home');
        //     return navigation.navigate( 'HomeStack', { screen : 'Home' , params: route.params }  );
        // }

        handleNavigation();

    }, []);


    function handleNavigation() {
        setTimeout(function () {

            setTimeout(function () {
                setLoading(false)
            }, 1000)

            if (typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params === "undefined") {
                console.log('Move to home');
                console.log("homeBtn", homeBtn);
                navigation.navigate('HomeStack', {screen: 'Home', params: route.params});
            } else if (typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
                getRouteParam(navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params, 'postCreatedIdProp') ===
                getRouteParam(route, 'postCreatedIdProp')
            ) {
                console.log('Move to Create');
                navigation.navigate('PostTypeSelection');
            } else if (typeof navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params !== "undefined" &&
                getRouteParam(navigation.dangerouslyGetParent().dangerouslyGetState().routes[0].params, 'postCreatedIdProp') !==
                getRouteParam(route, 'postCreatedIdProp')
            ) {
                console.log("homeBtn", homeBtn);
                console.log('Move to home');
                navigation.navigate('HomeStack', {screen: 'Home', params: route.params});
            }

        }, 1000);
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "ALTRUIST",
            headerRight: () => <Text/>,
            headerLeft: () => <Text/>,
        });

    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                loading ?
                    <Loading/>
                    : <View style={styles.container}>

                        <TouchableOpacity id={"home"} style={styles.button} onPress={() => {
                            navigation.navigate('HomeStack', {screen: 'Home', params: route.params})
                        }}>
                            <Text style={styles.buttonText} ref={input => setHomeBut(input)}>Go Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity id={"post"} style={styles.button} onPress={() => {
                            navigation.navigate('PostTypeSelection', {
                                postTypeIdProp: "",
                                idProp: "",
                                postCategoryIdProp: "",
                                titleProp: "",
                                descriptionProp: "",
                                cityNameProp: "",
                                latProp: "",
                                langProp: "",
                                uploadsObjProp: []
                            })
                        }} ref={input => setHomeBut(input)}>
                            <Text style={styles.buttonText}>Create New Post</Text>
                        </TouchableOpacity>

                    </View>
            }
        </View>
    )
}

export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    para: {
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        textAlign: "center",
        marginVertical: 30,
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

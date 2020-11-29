import React, {useEffect, useRef, useState} from 'react'
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native'
import {windowHeight, windowWidth} from "../../utils/Dimensions";
import {Camera} from "expo-camera";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import API from "../../services/api";
import Loading from "../../common/Loading";
import FileUploadExampleScreen from "./FileUploadExampleScreen";

const CameraScreen = ({navigation  }) => {

    const cameraEl = useRef(null);

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [previewImage, setPreviewImage] = useState(false);

    const [imageUploadinInProcess, setImageUploadinInProcess] = useState(false);

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            (async () => {
                const {status} = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();


        }
        return () => {
            isUnMount = true;
        }
    }, [])


    if (hasPermission === null) {
        return <View/>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const snap = async () => {
        if (cameraEl.current) {
            const options = {quality: 0.5, base64: true};
            const data = await cameraEl.current.takePictureAsync(options);
            console.log(data.uri);
            setPreviewImage(data.uri);
        }
    };

    return (
        <View style={{flex: 1}}>
            {
                previewImage ?
                    <View style={{flex: 1, width: windowWidth, height: windowHeight, position: "relative"}}>
                        <View style={{
                            position: "absolute",
                            top:-10,
                            left: windowWidth-100,
                            width: 100, height: 100,
                            color: "white",
                            zIndex: 3, // works on ios
                            elevation: 3, // works on android
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'flex-end',
                                        margin: 30,
                                        marginRight: 30
                                    }}
                                    onPress={() => {
                                        setPreviewImage(false);
                                    }}>
                                    <FontAwesome5Icon name={"times"}
                                                      size={35} color={colors.white}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            position: "absolute",
                            top:windowHeight-100,
                            left: windowWidth-100,
                            width: 100, height: 100,
                            color: "white",
                            zIndex: 3, // works on ios
                            elevation: 3, // works on android
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                {
                                    imageUploadinInProcess ?  <View style={styles.loadingContainer}>
                                        <ActivityIndicator size='large' color={colors.white}/>
                                    </View> : <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            alignSelf: 'flex-end',
                                            alignItems: 'flex-end',
                                            margin: 30,
                                            marginRight: 30
                                        }}
                                        onPress={ async () => {


                                            setImageUploadinInProcess( true );
                                            const uploadResponse = await API.uploadImageAsync( previewImage );
                                            const uploadResult = await uploadResponse.json();

                                            //console.log("uploadResult",uploadResult);
                                            if (uploadResult.success === true && uploadResult.hasOwnProperty('data') && uploadResult['data'].hasOwnProperty('objectUrl')) {

                                                try {
                                                    //imageUploaded(uploadResult['data']);
                                                    console.log( "imageUploaded" ,uploadResult['data'] );

                                                    await API.User.updateProfile({
                                                        profile_picture:uploadResult['data'].key
                                                    }).then(() => {
                                                        setImageUploadinInProcess( false );
                                                        navigation.navigate('UserProfile',{photoChanged:uploadResult['data'].key});
                                                    });

                                                } catch (error) {
                                                    // Error saving data
                                                    console.log( "imageUploaded" ,error );
                                                    console.log(error);
                                                    setImageUploadinInProcess( false );
                                                }

                                            } else {
                                                alert('Please choose small size picture!');
                                                setImageUploadinInProcess( false );
                                            }

                                        }}>
                                        <Ionicons name={"ios-send"}
                                                  size={35} color={colors.white}/>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>

                        <Image source={{uri: previewImage, width: windowWidth, height: windowHeight,}}/>
                    </View>
                    :
                    <Camera style={{
                        flex: 1,
                        backgroundColor: "red",
                        width: windowWidth,
                        height: windowHeight,
                        justifyContent: "center"
                    }} type={type}
                            ref={cameraEl}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                            <View style={{
                                ...styles.innerFlexContainer,
                                alignSelf: "flex-start"
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            alignSelf: 'flex-end',
                                            alignItems: 'flex-end',
                                            margin: 30,
                                            marginRight: 30
                                        }}
                                        onPress={() => {
                                            navigation.navigate('UserProfile')
                                        }}>
                                        <FontAwesome5Icon name={"times"}
                                                          size={35} color={colors.white}/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{
                                ...styles.innerFlexContainer,
                                alignSelf: "flex-end"
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        margin: 30,
                                        marginRight: 25
                                    }}
                                >
                                    {
                                        imageUploadinInProcess ?

                                            <View style={styles.loadingContainer}>
                                                <ActivityIndicator size='large' color={colors.white}/>
                                            </View>

                                            :            <FileUploadExampleScreen location={"AddProfilePicture"}
                                                                                  imageUploaded={ async (event) => {
                                                                                      setImageUploadinInProcess( true );
                                                                                      await API.User.updateProfile({
                                                                                          profile_picture:event.key
                                                                                      }).then(() => {
                                                                                          setImageUploadinInProcess( false );
                                                                                          navigation.navigate('UserProfile',{photoChanged:event.key});
                                                                                      });

                                                                                  }} />
                                    }


                                </View>


                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        margin: 30,
                                        marginRight: 25
                                    }}
                                    onPress={() => {
                                        snap();
                                    }}>
                                    <MaterialIcons name={"camera"}
                                                   size={35} color={colors.white}/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'flex-end',
                                        margin: 30,
                                        marginRight: 25
                                    }}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <MaterialIcons name={"flip"}
                                                   size={35} color={colors.white}/>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Camera>
            }
        </View>


    )
}

export default CameraScreen;

const styles = {
    innerFlexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },
}

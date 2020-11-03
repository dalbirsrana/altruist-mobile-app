import React, { Component } from 'react';
import {AsyncStorage, Platform, TouchableOpacity} from 'react-native';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../services/api';
import colors from "../../colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {windowHeight, windowWidth} from "../../utils/Dimensions";

export default class FileUploadExampleScreen extends Component {

    state = {
        image: null,
        previewImage: null,
        uploading: false,
    };

    componentDidMount() {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })()
    }

    render() {
        let {
            image
        } = this.state;

        return (
            <View>

                <StatusBar barStyle="default" />
                <Button
                    buttonStyle={
                        styles.imageUploadButton
                    }
                    onPress={this._pickImage}
                    type="outline"
                    icon={
                        <Icon
                            name="plus"
                            size={26}
                            color={colors.primary}
                        />
                    }
                />
                {this._maybeRenderUploadingOverlay()}

            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
    };

    _pickImage = async () => {
        console.log('Yes');
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

        // only if user allows permission to camera roll
        if (status === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!pickerResult.cancelled) {
                this._handleImagePicked(pickerResult);
            }
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true,
                previewImage: pickerResult.uri
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await API.uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();

                console.log(uploadResult);
                if( uploadResult.success === true && uploadResult.hasOwnProperty('data') && uploadResult['data'].hasOwnProperty('objectUrl') ){


                    try {
                        //console.log(key);
                        this.props.imageUploaded( uploadResult['data'] );
                    } catch (error) {
                        // Error saving data
                        console.log( error );
                    }

                    this.setState({
                        image: uploadResult['data']['objectUrl']
                    });
                }else{
                    alert('Please try again later!');
                }
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Please try again later!');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

}


const styles = StyleSheet.create({
    imageUploadButton: {
        height: windowHeight/4,
        width:windowWidth/2.3,
        borderRadius:30
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});


const styles2 = StyleSheet.create({
    catBox: {
        flexBasis: "100%",
        alignItems: "center",
        padding:10,
        minHeight:100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        borderRadius: 20,
        height: windowHeight/4,
        width:windowWidth/2.3,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        justifyContent: "center",
        textAlign: "center",
        margin:20,
        alignItems: "center",
        alignSelf:"center",
    }

});

import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from './api';
import AsyncStorageHelper from "./AsyncStorageHelper";

export default class SingleFileUpload extends Component {

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
            <View style={styles.container}>
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
                            color="#2288dd"
                        />
                    }
                />

                {this._maybeRenderImage()}
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

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    <Image source={{ uri: image }} style={styles.maybeRenderImage} />
                </View>
            </View>
        );
    };

    _pickImage = async () => {
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
                    let key = this.props['location'];

                    try {
                        console.log(key);
                        await AsyncStorageHelper.setObjectValue( key , uploadResult['data'] );
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
        minHeight : 150,
        minWidth : 125,
        borderRadius:10
    },

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
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
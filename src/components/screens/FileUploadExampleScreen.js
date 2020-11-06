import React, {Component, useContext} from 'react';
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
import {AuthContext} from "../navigation/AuthProvider";

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
        width:windowWidth-40,
        borderRadius:20,
        borderWidth:0
    },
    maybeRenderUploading: {
        marginTop:-5,
        borderRadius:20,
        height:50,
        alignItems: 'center',
        backgroundColor: "rgba(232,155,141,0.6)" ,
        justifyContent: 'center',
    }
});




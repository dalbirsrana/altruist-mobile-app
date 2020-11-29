import React, {Component} from 'react';
import {ActivityIndicator, Platform, StatusBar, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../services/api';
import colors from "../../colors/colors";
import {windowWidth} from "../../utils/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class FileUploadExampleScreen extends Component {

    state = {
        image: null,
        previewImage: null,
        uploading: false,
    };

    componentDidMount() {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
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

        let location = this.props.location;
        let iconUploadName = 'plus';

        let imageUploadButton = {
            width: windowWidth - 40,
            borderRadius: 20,
            borderWidth: 0
        }

        if (location == "PostUpload") {
            iconUploadName = 'plus';
        } else if (location == "ChangeProfilePicture") {
            iconUploadName = 'pencil';

            imageUploadButton = {
                width:  40,
                borderRadius: 20,
                borderWidth: 0
            }

        } else if (location == "AddProfilePicture") {
            iconUploadName = 'plus-circle';

            imageUploadButton = {
                width: 40,
                borderRadius: 20,
                borderWidth: 0
            }
        }

        return (
            <View>
                {
                    !this.state.uploading ?
                        <Button
                            buttonStyle={
                                styles.imageUploadButton
                            }
                            onPress={this._pickImage}
                            type="outline"
                            icon={

                                location == "ChangeProfilePicture" || location == "AddProfilePicture" ?

                                    <MaterialIcons name={"photo-library"}
                                                   size={35} color={colors.white}/>
                                    :
                                    <Icon
                                        name={iconUploadName}
                                        size={26}
                                        color={colors.primary}
                                    />
                            }
                        /> : <View  >
                            {this._maybeRenderUploadingOverlay()}
                        </View>
                }


            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {

        let location = this.props.location;
        let styleData = [StyleSheet.absoluteFill, styles.maybeRenderUploading]
        let style= { styleData};

        let colour = colors.primary ;
        if (location == "ChangeProfilePicture" || location == "AddProfilePicture") {
            let styleData = [StyleSheet.absoluteFill]
            style={styleData}
            colour = "#fff" ;
        }

        if (this.state.uploading) {
            return (
                <View
                    style={style}
                    >
                    <ActivityIndicator color={colour} size="large"/>
                </View>
            );
        }
    };

    _pickImage = async () => {
        // console.log('Yes');
        const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

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

                //console.log("uploadResult",uploadResult);
                if (uploadResult.success === true && uploadResult.hasOwnProperty('data') && uploadResult['data'].hasOwnProperty('objectUrl')) {

                    try {
                        this.props.imageUploaded(uploadResult['data']);
                    } catch (error) {
                        // Error saving data
                        console.log(error);
                    }

                    this.setState({
                        image: uploadResult['data']['objectUrl']
                    });
                } else {
                    alert('Please choose small size picture!');
                }
            }
        } catch (e) {
            // console.log({ uploadResponse });
            // console.log({ uploadResult });
            // console.log({ e });
            alert('Please choose small size file!');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

}

const styles = StyleSheet.create({
    imageUploadButton: {
        width: windowWidth - 40,
        borderRadius: 20,
        borderWidth: 0
    },
    maybeRenderUploading: {
        marginTop: -5,
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        backgroundColor: "rgba(232,155,141,0.6)",
        justifyContent: 'center',
    }
});




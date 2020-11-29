import React, {Component} from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, View} from 'react-native';
import ResponsiveImage from "react-native-responsive-image";
import colors from "../colors/colors";


export default class LoadableImage extends Component {
    state = {
        loading: true
    }

    render() {
        const {source, styleData} = this.props
        return (
            <View style={styles.container}>

                <ResponsiveImage
                    style={styleData}
                    onLoadEnd={this._onLoadEnd}
                    source={source}
                />
                {
                    this.state.loading ?
                        <View style={
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: -20
                            }
                        }>
                            <ActivityIndicator size='large' color={colors.primary}/>
                        </View>
                        : null
                }

            </View>
        )
    }

    _onLoadEnd = () => {
        this.setState({
            loading: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})

AppRegistry.registerComponent("ResponsiveImageExample", () => App);
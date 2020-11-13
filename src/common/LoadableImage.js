import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

export default class LoadableImage extends Component {
    state = {
        loading: true
    }

    render() {
        const { source , styleData } = this.props
        return (
            <View style={styles.container}>
                <Image
                    style={ styleData }
                    onLoadEnd={this._onLoadEnd}
                    source={source}
                />
                <ActivityIndicator
                    style={styles.activityIndicator}
                    animating={this.state.loading}
                />
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
        flex: 1,
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})
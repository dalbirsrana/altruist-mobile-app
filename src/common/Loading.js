import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from "../colors/colors";

export default function Loading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={colors.primary}/>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    }
});

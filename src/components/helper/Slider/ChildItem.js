import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {windowWidth} from "../../../utils/Dimensions";
import LoadableImage from "../../../common/LoadableImage"

export default function ChildItem ({
                                 item,
                                 style,
                                 onPress,
                                 index,
                                 imageKey,
                                 local,
                                 height,
                                 active
                             })  {
    return (



                    <TouchableOpacity
                        style={styles.container}
                        onPress={() => onPress(index)}>
                        <LoadableImage
                            styleData={[styles.image, style, {height: height}]}
                            source={local ? item[imageKey] : {uri: item[imageKey]}}
                        />
                    </TouchableOpacity>


    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        position: 'relative',
        height: 230
    },
    image: {
        height: 230,
        width: windowWidth,
        resizeMode: 'stretch',
    },
});
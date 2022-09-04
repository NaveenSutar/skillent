import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from '../Icon';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Forward = ({onPress, style}) => {
    return (

        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.5}
                style={styles.iconContainer}>
                <Icon
                    type="AntIcon"
                    name="arrowright"
                    style={styles.icon}
                    size={dimensions.screenHeight / 33}
                    color={colours.skilent_white}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: dimensions.screenHeight / 10,
        width: dimensions.screenHeight / 10,
        backgroundColor: colours.skilent_white,
        borderRadius: dimensions.screenHeight / 10,
        borderWidth: dimensions.screenHeight / 300,

        borderTopColor: colours.skilent_primary,
        borderRightColor: colours.skilent_lightBackground,
        borderBottomColor: colours.skilent_lightBackground,
        borderLeftColor: colours.skilent_lightBackground,

        transform: [{ rotate: '45deg' }],
        position: 'absolute',
        bottom: dimensions.screenHeight / 7,
        left: (dimensions.screenWidth / 2) - (dimensions.screenHeight / 10) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:0,
        flex:1
    },

    iconContainer: {
        backgroundColor: colours.skilent_primary,
        height: dimensions.screenHeight / 13,
        width: dimensions.screenHeight / 13,
        borderRadius: (dimensions.screenHeight / 13) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:2
    },

    icon: {
        transform: [{ rotate: '-45deg' }],
        borderRadius: dimensions.screenHeight / 10,
        zIndex:1
    }
});

export default Forward;




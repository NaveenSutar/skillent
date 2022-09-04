import { StyleSheet, TouchableOpacity } from 'react-native';

import { Body_1 } from '../Fonts';
import Icon from '../Icon';
import React from 'react';
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const FloatButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer} activeOpacity={0.5}>
            <Icon type="EntypoIcon" name="location-pin" size={dimensions.screenHeight / 40} color={colours.skilent_white} />
            <Body_1 text={title} colour={colours.skilent_white} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: dimensions.skilent_half_padding,
        position: 'absolute',
        bottom: dimensions.skilent_margin,
        backgroundColor: colours.skilent_primary,
        borderRadius: 1000,
    }
});

export default FloatButton;
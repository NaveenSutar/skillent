import { StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { Subtitle } from '../Fonts';
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity  onPress={onPress} activeOpacity={0.5}>
            <View style={[styles.buttonContainer, style]}>
                <Subtitle text={title} colour={colours.skilent_white} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: dimensions.skilent_margin,
        marginBottom: dimensions.skilent_margin,
        backgroundColor: colours.skilent_primary,
        height: dimensions.screenHeight / 15,
        width: "100%",
        borderRadius: 50,
    }
});

export default Button;
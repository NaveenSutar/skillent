import { StyleSheet, Text } from 'react-native';

import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const LogoText = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.logo, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Heading_1 = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.heading_1, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Heading_2 = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.heading_2, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Heading_3 = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.heading_3, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Subtitle = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.subTitle, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Body_1 = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.body_1, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const Body_2 = ({ text, colour, style, onPress, numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} allowFontScaling={false} onPress={onPress} style={[styles.body_2, style, { color: colour ? colour : colours.skilent_textPrimary }]}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontFamily: 'SFProDisplay-Semibold',
        fontSize: dimensions.screenHeight / 18,
        color: colours.skilent_textPrimary
    },

    heading_1: {
        fontFamily: 'SFProDisplay-Bold',
        fontSize: dimensions.screenHeight / 23
    },

    heading_2: {
        fontFamily: 'SFProDisplay-Medium',
        fontSize: dimensions.screenHeight / 32
    },

    heading_3: {
        fontFamily: 'SFProDisplay-Semibold',
        fontSize: dimensions.screenHeight / 38
    },

    subTitle: {
        fontFamily: 'SFProDisplay-Bold',
        fontSize: dimensions.screenHeight / 43
    },

    body_1: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: dimensions.screenHeight / 50
    },

    body_2: {
        fontFamily: 'SFProDisplay-Light',
        fontSize: dimensions.screenHeight / 65
    },
});

export {
    LogoText,
    Heading_1,
    Heading_2,
    Heading_3,
    Subtitle,
    Body_1,
    Body_2
};
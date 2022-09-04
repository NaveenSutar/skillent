import { Body_1, Subtitle } from '../Fonts';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const ButtonBottomText = ({ onPress, info, action, style }) => {
    return (
        <View style={[styles.bottomTextContainer, style]}>
            <Body_1 text={info}colour={colours.skilent_textSecondary}/>
            <Body_1 text={action} colour={colours.skilent_primary} onPress={onPress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default ButtonBottomText;

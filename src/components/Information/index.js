import { Body_1, Body_2, Subtitle } from '../Fonts';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from './../../components/Icon';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Information = ({ infoText }) => {
    return (
        <View style={styles.container}>

            <Icon
                name="sad-outline"
                type="IonIcon"
                style={styles.infoIcon}
                size={dimensions.screenHeight / 10}
                color={colours.skilent_textPlaceHolder} />

            <Body_1 text={infoText} colour={colours.skilent_textSecondary} style={{textAlign:'center',}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoIcon:{
        padding: dimensions.skilent_padding,
    }
});

export default Information;
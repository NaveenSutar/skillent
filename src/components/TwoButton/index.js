import { StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { Subtitle } from '../Fonts';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

// create a component
const TwoButton = ({ btn1Title, btn2Title, btn1Onpress, btn2Onpress, btn1BGColour, btn2BGColour }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={btn1Onpress} style={styles.applyButton} activeOpacity={0.5}>
                <View style={[styles.applyButtonContainer, { backgroundColor: btn1BGColour }]}>
                    <Subtitle text={btn1Title} colour={colours.skilent_white} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={btn2Onpress} style={styles.shareButton} activeOpacity={0.5}>
                <View style={[styles.shareButtonContainer, { backgroundColor: btn2BGColour }]}>
                    <Subtitle text={btn2Title} colour={colours.skilent_primary} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colours.skilent_white,
        paddingHorizontal: dimensions.skilent_padding,
        paddingVertical: dimensions.skilent_half_padding
    },

    applyButton: {
        flex: 1,
        paddingRight: dimensions.skilent_half_padding,

    },

    shareButton: {
        flex: 1,
        paddingLeft: dimensions.skilent_half_padding,

    },

    applyButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: dimensions.screenHeight / 18,
        width: "100%",
        borderRadius: 50,
    },

    shareButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: dimensions.screenHeight / 18,
        width: "100%",
        borderRadius: 50,
        borderColor: colours.skilent_primary,
        borderWidth: dimensions.screenWidth / 200,
        backgroundColor: colours.skilent_white
    }
});

export default TwoButton;
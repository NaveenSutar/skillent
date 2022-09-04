import { Body_1, Heading_2, LogoText } from '../Fonts';
import { Image, StyleSheet, View } from 'react-native';

import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../../../assets/colours';
import dimensions from './../../../assets/dimensions';

const Logo = () => {
    return (
        <View style={styles.bannerLogo}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImage} source={require('./../../../assets/images/logo.png')} />
                <LogoText text="SKILENT" colour={colours.skilent_textPrimary} />
            </View>
        </View>
    );
};

const LogoHeader = (props) => {
    return (
        <View style={styles.logoHeader}>

            <View style={styles.logoHeaderContainer}>
                <Image style={styles.logoHeaderImage} source={require('./../../../assets/images/logo.png')} />
                <Heading_2 text="SKILENT" colour={colours.skilent_textPrimary} />
            </View>

            <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
                <View style={styles.button}>
                    <Body_1 text={props.title} colour={colours.skilent_primary} />
                </View>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    bannerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        height: dimensions.screenHeight / 6,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoImage: {
        height: dimensions.screenHeight / 16,
        width: dimensions.screenHeight / 16,
        resizeMode: 'contain'
    },

    logoHeader: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        height: dimensions.screenHeight / 15,
        marginBottom: dimensions.skilent_margin * 3,
        marginTop: dimensions.skilent_margin
    },

    logoHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoHeaderImage: {
        height: dimensions.screenHeight / 30,
        width: dimensions.screenHeight / 30,
        resizeMode: 'contain'
    },

    button: {
        borderColor: colours.skilent_primary,
        borderWidth: 1,
        paddingHorizontal: dimensions.skilent_padding * 1.5,
        paddingVertical: dimensions.skilent_half_padding / 2,
        borderRadius: 1000,
    }
});
export { Logo, LogoHeader };

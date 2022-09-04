import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Body_1 } from '../../components/Fonts';
import IonIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const MoreCard = ({ icon_name, option_name, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={onPress ? 0.5 : 1}
            style={styles.messageCardContainer}>

            <IonIcon
                style={styles.icon}
                name={icon_name} size={dimensions.screenHeight / 35}
                color={colours.skilent_primary} />

            <View style={styles.messageBodyContainer}>
                <Body_1
                    style={styles.bodyHeading}
                    text={option_name}
                    colour={colours.skilent_textPrimary} />

                <IonIcon
                    style={styles.rightIcon}
                    name="ios-chevron-forward" size={dimensions.screenHeight / 40}
                    color={colours.skilent_primary} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    messageCardContainer: {
        alignItems: 'center',
        height: dimensions.screenHeight / 12,
        marginLeft: dimensions.skilent_padding,
        flexDirection: 'row',
        borderBottomColor: colours.skilent_primary, borderBottomWidth: 0.5
    },

    icon: {
        marginRight: dimensions.skilent_margin
    },

    bodyHeading: {
        fontWeight: "600"
    },

    messageBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        height: dimensions.screenHeight / 11,
    },

    rightIcon: {
        marginRight: dimensions.skilent_margin
    }
});

export default MoreCard;

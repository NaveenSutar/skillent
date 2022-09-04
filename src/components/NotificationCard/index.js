import { Body_1, Body_2 } from '../../components/Fonts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Avtar from '../Avtaar';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const NotificationCard = ({ heading, message, time, onPress, bold, boldStyle }) => {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.5 : 1}
            style={styles.messageCardContainer}
            onPress={onPress}>

            <View style={styles.messageBodyContainer}>
                <View>
                    <Body_1
                        numberOfLines={1}
                        style={boldStyle}
                        text={heading}
                        colour={colours.skilent_textPrimary} />

                    <Body_2
                        numberOfLines={1}
                        style={{ fontWeight: bold ? "600" : "normal", paddingRight: dimensions.skilent_padding, marginTop: 2, marginBottom: 2 }}
                        text={message}
                        colour={colours.skilent_textPrimary} />

                    <Body_2
                        numberOfLines={1}
                        style={{ fontWeight: bold ? "600" : "normal", paddingRight: dimensions.skilent_padding }}
                        text={time}
                        colour={colours.skilent_textSecondary} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    messageCardContainer: {
        alignItems: 'center',
        height: dimensions.screenHeight / 10,
        paddingLeft: dimensions.skilent_padding,
        flexDirection: 'row'
    },

    messageBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        height: dimensions.screenHeight / 10,
        borderBottomColor: colours.skilent_primary,
        borderBottomWidth: 0.5
    }
});

export default NotificationCard;

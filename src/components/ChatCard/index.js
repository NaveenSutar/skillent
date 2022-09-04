import { Body_1, Body_2, Heading_3, Subtitle } from '../Fonts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Avtar from '../Avtaar';
import Margin from '../Margin';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const FromChat = ({ fromImage, fromName, fromMessage, fromTime }) => {
    return (
        <View style={styles.messageCardContainer}>
            <Avtar
                style={styles.avtar}
                size={18}
                noBorder
                image={fromImage} />

            <View style={styles.messageBodyContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Body_1
                        style={styles.bodyHeading}
                        text={fromName}
                        colour={colours.skilent_textPrimary} />

                    <Heading_3
                        style={styles.timeDot}
                        text={'\u00B7'} />

                    <Body_2
                        text={fromTime}
                        colour={colours.skilent_textPrimary} />
                </View>

                <Margin margin={0.5} />

                <Body_1
                    text={fromMessage}
                    colour={colours.skilent_textPrimary} />
            </View>
        </View>
    );
};

const ToChat = ({ toImage, toName, toMessage, toTime }) => {
    return (
        <View style={styles.messageCardContainer}>

            <Avtar
                style={styles.avtar}
                size={18}
                noBorder
                image={toImage} />

            <View style={styles.messageBodyContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Body_1
                        style={styles.bodyHeading}
                        text={toName}
                        colour={colours.skilent_textPrimary} />

                    <Heading_3
                        style={styles.timeDot}
                        text={'\u00B7'} />

                    <Body_2
                        text={toTime}
                        colour={colours.skilent_textPrimary} />
                </View>
                <Margin margin={0.5} />
                <Body_1
                    text={toMessage}
                    colour={colours.skilent_textPrimary} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageCardContainer: {
        // alignItems: 'center',
        paddingLeft: dimensions.skilent_padding,
        flexDirection: 'row'
    },

    avtar: {
        marginTop: dimensions.skilent_half_margin
    },

    timeDot: {

        marginRight: dimensions.skilent_half_margin / 2,
        marginLeft: dimensions.skilent_half_margin / 2

    },

    messageBodyContainer: {
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between',
        borderBottomColor: colours.skilent_primary,
        borderBottomWidth: 0.5,
        paddingBottom: dimensions.skilent_half_padding,
        paddingTop: dimensions.skilent_half_padding,
        paddingRight: dimensions.skilent_padding,
    },

    bodyHeading: {
        fontWeight: "600"
    },

    rightItem: {
        marginRight: dimensions.skilent_margin
    }

});

export { FromChat, ToChat };

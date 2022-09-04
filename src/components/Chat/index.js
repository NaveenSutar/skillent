import { Body_1, Body_2 } from '../../components/Fonts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Avtar from '../Avtaar';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Chat = ({ image, name, recent_msg, recent_msg_time, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.5 : 1}
            style={styles.messageCardContainer}>

            <Avtar
                size={18}
                noBorder
                image={image} />

            <View style={styles.messageBodyContainer}>
                <View>
                    <Body_1
                        style={styles.bodyHeading}
                        text={name}
                    />

                    <Body_2
                        text={recent_msg}
                    />
                </View>

                <Body_2
                    style={styles.rightItem}
                    text={recent_msg_time}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    messageCardContainer: {
        alignItems: 'center',
        height: dimensions.screenHeight / 11,
        paddingLeft: dimensions.skilent_padding,
        flexDirection: 'row'
    },

    messageBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        height: dimensions.screenHeight / 11,
        borderBottomColor: colours.skilent_primary,
        borderBottomWidth: 0.5
    },
    bodyHeading: {
        fontWeight: "600"
    },

    rightItem: {
        marginRight: dimensions.skilent_margin
    }

});

export default Chat;

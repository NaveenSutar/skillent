import { Body_1, Body_2, Subtitle } from '../Fonts';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const PersonalCard = ({ icon_name, line_1, line_2, right_Icon, rigth_Icon_Name, right_Icon_Press }) => {
    return (
        <View style={styles.messageCardContainer}>

            <IonIcon
                style={styles.icon}
                name={icon_name} size={dimensions.screenHeight / 25}
                color={colours.skilent_primary} />

            <View style={styles.messageBodyContainer}>
                <Subtitle
                    style={styles.bodyHeading}
                    text={line_1}
                    colour={colours.skilent_textPrimary} />

                <Body_2
                    style={styles.bodyHeading}
                    text={line_2}
                    colour={colours.skilent_textSecondary} />
            </View>

            {
                !right_Icon
                    ?
                    <></>
                    :
                    <TouchableOpacity activeOpacity={0.5} onPress={right_Icon_Press} >
                        <IonIcon
                            style={styles.icon}
                            name={rigth_Icon_Name} size={dimensions.screenHeight / 25}
                            color={colours.skilent_primary} />
                    </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    messageCardContainer: {
        // alignItems: 'center',
        marginLeft: dimensions.skilent_padding,
        paddingRight: dimensions.skilent_padding,
        flexDirection: 'row',
        paddingVertical: dimensions.skilent_margin,
        borderBottomColor: colours.skilent_primary, borderBottomWidth: 0.5
    },

    icon: {
        marginRight: dimensions.skilent_margin
    },

    bodyHeading: {
        fontWeight: "600"
    },

    messageBodyContainer: {
        justifyContent: 'center',
        flex: 1
    },

    rightIcon: {
        marginRight: dimensions.skilent_margin
    }
});

export default PersonalCard;

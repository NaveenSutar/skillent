import { Body_2, Subtitle } from '../Fonts';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from '../Icon';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const EducationCard = ({ school, degree, field, year, onPressEdit }) => {
    return (
        <View style={styles.eduCardContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.iconContainer}>
                    <FAIcon name={"graduation-cap"} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                </View>
                <View style={{ marginLeft: dimensions.skilent_margin }}>
                    <Subtitle numberOfLines={1} style={[styles.bold, styles.textPadding]} text={school} />
                    <Body_2 numberOfLines={1} colour={colours.skilent_textSecondary} style={styles.textPadding} text={degree} />
                    <Body_2 numberOfLines={1} colour={colours.skilent_textSecondary} style={styles.textPadding} text={field} />
                    <Body_2 numberOfLines={1} colour={colours.skilent_textSecondary} style={[styles.bold, styles.textPadding]} text={year} />
                </View>
            </View>

            <TouchableOpacity onPress={onPressEdit} activeOpacity={0.5} style={styles.editIcon}>
                <Icon type="IonIcon" name={"ios-create-outline"} size={dimensions.screenHeight / 35} color={colours.skilent_primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    eduCardContainer: {
        flexDirection: 'row',
        borderColor: colours.skilent_primary,
        borderWidth: 0.5,
        borderRadius: dimensions.screenHeight / 200,
        marginVertical: dimensions.skilent_half_margin,
        padding: dimensions.skilent_padding,
        backgroundColor: colours.skilent_white,
        // height: dimensions.screenHeight / 6,
    },

    iconContainer: {
        backgroundColor: colours.skilent_lightBackground,
        width: dimensions.screenHeight / 10,
        borderRadius: dimensions.screenHeight / 140,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bold: {
        fontWeight: "600"
    },

    textPadding: {
        paddingTop: 1,
        paddingBottom: 1,
        width: dimensions.screenWidth / 1.9
    },

    editIcon: {
        position: 'absolute',
        top: dimensions.skilent_margin,
        right: dimensions.skilent_margin
    }
});

export default EducationCard;
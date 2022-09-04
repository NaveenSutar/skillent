import { Body_1, Subtitle } from '../../components/Fonts';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Header from '../../components/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const DashCard = ({ leftIconType, leftIcon, leftHeading, leftCount, leftCardOnPress, rightIcon, rightIconType, rightHeading, rightCount, rightCardOnPress }) => {
    return (
        <View style={styles.rowOne}>
            <TouchableOpacity onPress={leftCardOnPress} activeOpacity={leftCardOnPress ? 0.5 : 1} style={styles.leftCard}>
                <View style={styles.iconContainer}>
                    {
                        leftIconType == "IonIcon"
                            ?
                            <IonIcon name={leftIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                            :
                            leftIconType == "MatComIcon"
                                ?
                                <MatComIcon name={leftIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                                : leftIconType == "MatIcon"
                                    ?
                                    <MatIcon name={leftIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                                    :
                                    <></>
                    }

                </View>
                <Body_1 colour={colours.skilent_textPrimary} text={leftHeading} />
                <Subtitle colour={colours.skilent_textPrimary} text={leftCount} />

                <IonIcon name="chevron-forward-circle" style={{ position: 'absolute', bottom: dimensions.skilent_half_margin, right: dimensions.skilent_half_margin }} size={dimensions.screenHeight / 50} color={colours.skilent_primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={rightCardOnPress} activeOpacity={rightCardOnPress ? 0.5 : 1} style={styles.rightCard}>
                <View style={styles.iconContainer}>
                    {
                        rightIconType == "IonIcon"
                            ?
                            <IonIcon name={rightIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                            :
                            rightIconType == "MatComIcon"
                                ?
                                <MatComIcon name={rightIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                                : rightIconType == "MatIcon"
                                    ?
                                    <MatIcon name={rightIcon} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                                    :
                                    <></>
                    }
                </View>
                <Body_1 colour={colours.skilent_textPrimary} text={rightHeading} />
                <Subtitle colour={colours.skilent_textPrimary} text={rightCount} />

                <IonIcon name="chevron-forward-circle" style={{ position: 'absolute', bottom: dimensions.skilent_half_margin, right: dimensions.skilent_half_margin }} size={dimensions.screenHeight / 50} color={colours.skilent_primary} />

            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    rowOne: {
        flexDirection: 'row',
        flex: 1,
    },

    leftCard: {
        flex: 1,
        borderRadius: dimensions.screenHeight / 160,
        borderWidth: 0.5,
        borderColor: colours.skilent_primary,
        marginRight: dimensions.skilent_half_margin,
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
        padding: dimensions.skilent_half_padding,
        justifyContent: 'space-between'
    },

    rightCard: {
        flex: 1,
        borderRadius: dimensions.screenHeight / 160,
        borderWidth: 0.5,
        borderColor: colours.skilent_primary,
        marginLeft: dimensions.skilent_half_margin,
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
        padding: dimensions.skilent_half_padding,
        justifyContent: 'space-between'
    },

    iconContainer: {
        backgroundColor: colours.skilent_lightBackground,
        height: dimensions.screenHeight / 15,
        width: dimensions.screenHeight / 15,
        borderRadius: dimensions.screenHeight / 140,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default DashCard;

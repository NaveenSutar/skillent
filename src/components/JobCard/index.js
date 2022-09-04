import { Body_1, Body_2, Heading_2 } from '../Fonts';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import DetailElement from '../DetailElement';
import Icon from '../Icon';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const JobCard = ({ onPress, org, title, skills, location, logo, saveVisible, isSave, onPressSave, travel, relocation }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.jobCardContainer}>
            <View style={styles.leftItems}>

                <Body_1 text={org} />

                <Heading_2 numberOfLines={1} text={title} />
                <View style={styles.leftLine3ScrollContainer}>
                    <View style={styles.leftLine3Container}>
                        <Body_2 style={styles.leftLine3} text={skills} />
                    </View>
                </View>


                <View style={styles.locationContainer}>
                    <Icon style={{ marginRight: dimensions.skilent_half_margin / 2 }} type="IonIcon" name="location" size={dimensions.screenHeight / 65} color={colours.skilent_primary} />
                    <Body_2 text={location} colour={colours.skilent_textSecondary} />
                </View>

                {/* <Image style={styles.rightLine1} source={require('./../../../assets/images/comtech.png')} /> */}

                {
                    saveVisible
                        ?
                        <TouchableOpacity onPress={onPressSave} activeOpacity={0.5} style={styles.rightLine1}>
                            <Icon type="IonIcon" name={isSave ? "bookmark" : "bookmark-outline"} size={dimensions.screenHeight / 30} color={colours.skilent_primary} />
                        </TouchableOpacity>
                        :
                        <></>
                }

                <Icon type="FAIcon" name="plane" style={styles.rightLine2} size={dimensions.screenHeight / 40} color={travel ? colours.skilent_primary : colours.skilent_textPlaceHolder} />
                <Icon type="IonIcon" name="map" style={styles.rightLine3} size={dimensions.screenHeight / 40} color={relocation ? colours.skilent_primary : colours.skilent_textPlaceHolder} />

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    jobCardContainer: {
        flexDirection: 'row',
        borderColor: colours.skilent_primary,
        borderWidth: 0.5,
        borderRadius: dimensions.screenHeight / 200,
        marginVertical: dimensions.skilent_half_margin,
        padding: dimensions.skilent_padding,
        backgroundColor: colours.skilent_white,
        height: dimensions.screenHeight / 5,
    },

    leftItems: {
        flex: 1,
        justifyContent: 'space-between'
    },

    leftLine3ScrollContainer: {
        flexDirection: 'row'
    },

    leftLine3Container: {
        backgroundColor: colours.skilent_lightBackground,
        alignSelf: 'flex-start',
        borderRadius: dimensions.screenHeight / 10,
        marginEnd: dimensions.skilent_half_margin
    },

    leftLine3: {
        padding: dimensions.skilent_half_margin,
        paddingTop: dimensions.skilent_half_margin / 2,
        paddingBottom: dimensions.skilent_half_margin / 2,
        padding: dimensions.skilent_half_margin,
        fontWeight: "600"
    },

    locationContainer: {
        flexDirection: 'row'
    },

    rightLine1: {
        // height: dimensions.screenHeight / 28,
        // width: dimensions.screenHeight / 28,
        // resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        right: 0
    },

    rightLine2: {
        height: dimensions.screenHeight / 40,
        width: dimensions.screenHeight / 40,
        position: 'absolute',
        bottom: 0,
        right: dimensions.screenHeight / 40 + dimensions.skilent_half_margin / 2,
    },

    rightLine3: {
        height: dimensions.screenHeight / 40,
        width: dimensions.screenHeight / 40,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
});

export default JobCard;
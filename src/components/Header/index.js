import { Body_2, Heading_3 } from '../Fonts';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Avtar from '../Avtaar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';
import { useNavigation } from '@react-navigation/native';

const Header = ({ text, style, colour, arrow, arrowOnpress, avtar, avtImage, avtSize, avtOnPress, avtNoBorder, notify, notifyCount, notifyOnPress, rightIcon, rightIconColour, rightIconName, rightIconsize, rightIconPress }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer} >
            {
                arrow
                    ?
                    <TouchableOpacity onPress={arrowOnpress ? arrowOnpress : () => navigation.goBack()} activeOpacity={0.5}>
                        <IonIcon name="ios-chevron-back" style={styles.backIcon} size={dimensions.screenHeight / 30} color={colours.skilent_textPrimary} />
                    </TouchableOpacity>
                    :
                    avtar
                        ?
                        <Avtar image={avtImage} size={avtSize} onPress={avtOnPress} avtNoBorder={avtNoBorder} />
                        :
                        <></>
            }

            <Heading_3 colour={colour} style={style} text={text} />

            {
                rightIcon
                    ?
                    <TouchableOpacity onPress={rightIconPress} activeOpacity={rightIconPress ? 0.5 : 1} style={styles.rightIcon}>
                        <IonIcon name={rightIconName} size={dimensions.screenHeight / rightIconsize} color={rightIconColour} />
                    </TouchableOpacity>
                    :
                    notify
                        ?
                        <TouchableOpacity onPress={notifyOnPress} activeOpacity={0.5} style={styles.notify}>
                            <IonIcon name="notifications" size={dimensions.screenHeight / 30} color={colours.skilent_primary} />

                            {
                                notifyCount
                                    ?
                                    <View style={styles.notifyCount}>
                                        <Body_2 text={notifyCount} colour={colours.skilent_white} />
                                    </View>

                                    :
                                    <></>
                            }
                        </TouchableOpacity>
                        :
                        <></>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dimensions.skilent_margin,
        marginTop: dimensions.skilent_margin,
        marginLeft: dimensions.skilent_margin,
        marginRight: dimensions.skilent_margin,
    },

    backIcon: {
        marginLeft: -dimensions.skilent_half_margin
    },

    notify: {
        justifyContent: "flex-end",
        marginLeft: 'auto',
        alignSelf: 'flex-end',
        paddingRight: dimensions.screenHeight / 100,
        height: dimensions.screenHeight / 25,
    },

    rightIcon: {
        justifyContent: "flex-end",
        marginLeft: 'auto',
        alignSelf: 'flex-end',
        height: dimensions.screenHeight / 25
    },

    notifyCount: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colours.skilent_danger,
        borderRadius: dimensions.screenHeight / 40,
        height: dimensions.screenHeight / 40,
        width: dimensions.screenHeight / 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colours.skilent_white
    }
});

export default Header;

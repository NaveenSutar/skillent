import { StyleSheet, View } from 'react-native';

import { Body_2 } from '../Fonts';
import Icon from '../Icon';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const DetailElement = ({detailText, icon, color}) => {
    return (
        <View style={styles.container}>
            <Icon type={"IonIcon"} name={icon} size={dimensions.screenHeight / 50} color={colours.skilent_textSecondary}  style={styles.rightLine2} />
            <Body_2 style={styles.text} text={detailText} colour={color ? color : colours.skilent_textPrimary} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
    },

    text: {
        marginLeft: dimensions.skilent_half_margin
    }
});

export default DetailElement;

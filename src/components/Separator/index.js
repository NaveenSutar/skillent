import { StyleSheet, View } from 'react-native';

import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Separator = () => {
    return (
        <View style={styles.separate}/>
    );
};

const styles = StyleSheet.create({
    separate: {
        width: "100%",
        backgroundColor: colours.skilent_lightBackground,
        height: dimensions.screenHeight / 120
    }
});

export default Separator;

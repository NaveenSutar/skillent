import React from 'react';
import { View } from 'react-native';
import dimensions from '../../../assets/dimensions';

const Margin = ({ margin }) => {
    return (
        <View style={{ marginTop: dimensions.skilent_half_margin * margin }}></View>
    );
};

export default Margin;

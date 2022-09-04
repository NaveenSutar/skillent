import { Image, TouchableOpacity } from 'react-native';

import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const Avtar = ({ size, onPress, noBorder, image, style }) => {
    return (
        <TouchableOpacity
            style={[style, {
                height: dimensions.screenHeight / size,
                width: dimensions.screenHeight / size,
                backgroundColor: !noBorder ? colours.skilent_mediumBackground : null,
                borderRadius: dimensions.screenHeight / size,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: dimensions.skilent_half_margin
            }]}
            activeOpacity={onPress ? 0.5 : 1}
            onPress={onPress}>


            <Image
                style={{
                    height: dimensions.screenHeight / (size + 1.5),
                    width: dimensions.screenHeight / (size + 1.5),
                    borderRadius: dimensions.screenHeight / (size + 1.5),
                    borderColor: !noBorder ? colours.skilent_white : null,
                    borderWidth: !noBorder ? 1 : 0
                }}
                source={image} />
        </TouchableOpacity >
    );
};

export default Avtar;

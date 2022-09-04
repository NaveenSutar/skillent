import AnimatedLoader from 'react-native-animated-loader';
import React from 'react';
import dimensions from '../../../assets/dimensions';

const Indicator = props => {
    const {
        loading,
    } = props;
    return (
        <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.0)"
            animationStyle={{
                width: dimensions.screenWidth / 4,
                height: dimensions.screenWidth / 4,
                position:'absolute',
                top:0,
                
            }}
            speed={1}
            source={require("../../../assets/animations/loader.json")}
        />
    )
}

export default Indicator;
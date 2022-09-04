import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const dimensions = {
    screenHeight: height,
    screenWidth: width,

    skilent_margin: height / 40,
    skilent_padding: height / 40,

    skilent_half_margin: (height / 40) / 2,
    skilent_half_padding: (height / 40) / 2,

    skilent_vertical_margin: (height / 60) / 2,
    skilent_vertical_padding: (height / 60) / 2,
}

export default dimensions;
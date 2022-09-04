import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const getIcon = (name, size, color, type, style) => {
    switch (type) {
        case "AntIcon": return <AntDesign name={name} size={size} color={color} style={style} />
            break;
        case "EntypoIcon": return <Entypo name={name} size={size} color={color} style={style} />
            break;
        case "EvilIcon": return <EvilIcons name={name} size={size} color={color} style={style} />
            break;
        case "FeatherIcon": return <Feather name={name} size={size} color={color} style={style} />
            break;
        case "FAIcon": return <FontAwesome name={name} size={size} color={color} style={style} />
            break;
        case "FA5Icon": return <FontAwesome5 name={name} size={size} color={color} style={style} />
            break;
        case "FontistoIcon": return <Fontisto name={name} size={size} color={color} style={style} />
            break;
        case "FoundationIcon": return <Foundation name={name} size={size} color={color} style={style} />
            break;
        case "IonIcon": return <Ionicons name={name} size={size} color={color} style={style} />
            break;
        case "MatComIcon": return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
            break;
        case "MatIcon": return <MaterialIcons name={name} size={size} color={color} style={style} />
            break;
        case "OctIcon": return <Octicons name={name} size={size} color={color} style={style} />
            break;
        case "SimpleLineIcon": return <SimpleLineIcons name={name} size={size} color={color} style={style} />
            break;
        case "ZocialIcon": return <Zocial name={name} size={size} color={color} style={style} />
            break;
        default: return <></>
            break;
    }
}

const Icon = ({ name, size, color, type, style }) => {
    return getIcon(name, size, color, type, style);
};

export default Icon;

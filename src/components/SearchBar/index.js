import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const SearchBar = ({ returnKeyType, onChangeText, ref, autoCapitalize, autoCorrect, clearButtonMode, filters, filterOnPress }) => {
    return (
        <View style={styles.searchBar}>
            <IonIcon
                name="search"
                style={styles.searchIcon}
                size={dimensions.screenHeight / 40}
                color={colours.skilent_textSecondary} />

            <TextInput
                style={styles.searchInput}
                placeholder='Search'
                placeholderTextColor={colours.skilent_textSecondary}

                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
                ref={ref}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                clearButtonMode={clearButtonMode}
            />

            {

                filters
                    ?

                    <>
                        <View style={styles.separator} />
                        <TouchableOpacity activeOpacity={0.5} onPress={filterOnPress}>
                            <Icon
                                name="sliders"
                                style={styles.filterIcon}
                                size={dimensions.screenHeight / 35}
                                color={colours.skilent_primary} />
                        </TouchableOpacity>
                    </>
                    :
                    <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        height: dimensions.screenHeight / 18,
        backgroundColor: colours.skilent_background,
        marginBottom: dimensions.skilent_half_margin,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    searchIcon: {
        marginLeft: dimensions.skilent_margin
    },

    searchInput: {
        flex: 1,
        paddingLeft: dimensions.skilent_padding,
        fontFamily: 'SFProDisplay-Light',
        fontSize: dimensions.screenHeight / 40,
    },

    separator: {
        width: 0.5,
        marginLeft: dimensions.skilent_margin,
        marginRight: dimensions.skilent_margin,
        height: dimensions.screenHeight / 30,
        backgroundColor: colours.skilent_textSecondary
    },

    filterIcon: {
        marginRight: dimensions.skilent_margin
    }
});

export default SearchBar;
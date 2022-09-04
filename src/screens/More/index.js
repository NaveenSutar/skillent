import React, { Component } from 'react';

import Header from '../../components/Header';
import MoreCard from '../../components/MoreCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Separator from '../../components/Separator';
import { StyleSheet } from 'react-native';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Header text="More" colour={colours.skilent_textPrimary} />

                <Separator />

                {/* <MoreCard
                    option_name="Jobs"
                    icon_name="briefcase" /> */}

                <MoreCard
                    onPress={() => this.props.navigation.navigate('Calender')}
                    option_name="Calender"
                    icon_name="calendar" />

                {/* <MoreCard
                    option_name="Zoom"
                    icon_name="videocam" /> */}

                <MoreCard
                    option_name="Support"
                    icon_name="help-buoy" />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    },

    workingContainer: {
        flex: 1,
        marginLeft: dimensions.skilent_margin,
        marginEnd: dimensions.skilent_padding,
    }
});
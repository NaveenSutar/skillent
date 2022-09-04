import { } from 'react-native-gesture-handler';

import { Agenda, Calendar } from 'react-native-calendars';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Separator from '../../components/Separator';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

                <Header
                    arrow={true}
                    text="Calender"
                    colour={colours.skilent_textPrimary}

                    rightIcon
                    rightIconColour={colours.skilent_primary}
                    rightIconName={"ios-add-circle-sharp"}
                    rightIconsize={30}
                    rightIconPress={() => { console.log('Hi') }}
                />

                <Separator />

                <Calendar
                    theme={{
                        backgroundColor: colours.skilent_white,
                        calendarBackground: colours.skilent_white,
                        textSectionTitleColor: colours.skilent_textSecondary,
                        textSectionTitleDisabledColor: colours.skilent_textSecondary,
                        selectedDayBackgroundColor: colours.skilent_primary,
                        selectedDayTextColor: colours.skilent_white,
                        todayTextColor: colours.skilent_primary,
                        dayTextColor: colours.skilent_textPrimary,
                        textDisabledColor: colours.skilent_textSecondary,
                        dotColor: colours.skilent_primary,
                        selectedDotColor: colours.skilent_white,
                        arrowColor: colours.skilent_primary,
                        disabledArrowColor: colours.skilent_textSecondary,
                        monthTextColor: colours.skilent_textPrimary,
                        indicatorColor: colours.skilent_light,
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: dimensions.screenHeight / 43,
                        textMonthFontSize: dimensions.screenHeight / 43,
                        textDayHeaderFontSize: dimensions.screenHeight / 43
                    }}

                    hideExtraDays={true}
                    enableSwipeMonths={true}
                />

                <Separator />


                <ScrollView style={styles.workingContainer}>

                </ScrollView>
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
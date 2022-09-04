import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Header from '../../components/Header';
import MessageCard from '../../components/MessageCard';
import PersonalCard from '../../components/PersonalCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profileData: this.props.route.params.profileData,
        };
    }

    componentDidMount = () => {
        this._getBirthday();
    }

    _getBirthday = () => {
        var d = new Date(this.state.profileData.birthday);
        console.log(d);
    }

    render() {
        const { profileData } = this.state;
        var d = new Date(profileData.birthday);

        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Header
                    text="Personal Details"
                    colour={colours.skilent_textPrimary}
                    arrow

                    rightIcon
                    rightIconColour={colours.skilent_primary}
                    rightIconName={"ios-create-outline"}
                    rightIconsize={30}
                    rightIconPress={() => { console.log('Hi') }}
                />

                <Separator />

                <ScrollView showsVerticalScrollIndicator={false}>

                    <PersonalCard
                        icon_name="md-person-circle-outline"
                        line_1={`${profileData.firstName} ${profileData.lastName}`}
                        line_2="Fullname"
                    />

                    <PersonalCard
                        icon_name="location"
                        line_1={profileData.city.name}
                        line_2="City"
                    />

                    <PersonalCard
                        icon_name="location"
                        line_1={profileData.country.name}
                        line_2="Country"
                    />

                    <PersonalCard
                        icon_name="calendar"
                        line_1={(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()}
                        line_2="Birthdate"
                    />

                    <PersonalCard
                        icon_name="phone-portrait"
                        line_1={`${profileData.phonePrefix} ${profileData.phone}`}
                        line_2="Phone"
                    />

                    <PersonalCard
                        icon_name="notifications"
                        line_1={`${profileData.notificationSettings.expiresIn.value} ${profileData.notificationSettings.expiresIn.value > 1 ? "Days" : "Day"}`}
                        line_2="Save notification for"
                    />

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
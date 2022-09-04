import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DashCard from '../../components/DashCard';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Separator from '../../components/Separator';
import api from '../../../assets/api';
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',

            data_0: '',
            data_1: '',
            data_2: '',
            data_3: '',
            data_4: '',
            data_5: '',
            data_6: '',
            data_7: '',
        };
    }

    componentDidMount = () => {
        this.checkSession();
    }

    checkSession = async () => {
        let loginTime = await AsyncStorage.getItem('loginTime')
        let hours = this.timeDiffCalc(new Date(loginTime), new Date());
        hours > 24 ? this._logout() : this.fetchData();
    }

    timeDiffCalc = (datePast, dateNow) => {
        let diffInMilliSeconds = Math.abs(datePast - dateNow) / 1000;
        let totalHrs = 0;

        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;

        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;

        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        if (days > 0)
            return totalHrs = (days * 24) + hours;

        else
            return totalHrs = hours;
    }

    _logout = async () => {
        try {
            await AsyncStorage.removeItem('skilent_tokan');
            await AsyncStorage.removeItem('loginTime');
            await setTimeout(async () => {
                await this.props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'SignIn' }],
                });
            }, 100);

        }
        catch (error) {
            console.error(error);
        }
    }

    setRecommenedValues = async () => {
        const { data_4, data_6 } = this.state;

        let skill = data_6.skills.map((skill) => `%22${skill.id}%22`).toString();

        await AsyncStorage.setItem('cityId', data_4.cityId.toString());
        await AsyncStorage.setItem('tagIdArray', skill);
        await AsyncStorage.setItem('rateFrom', data_6.hourlyRateFrom == null ? "0" : data_6.hourlyRateFrom.toString());
        await AsyncStorage.setItem('rateTo', data_6.hourlyRateTo == null ? "0" : data_6.hourlyRateTo.toString());
        await AsyncStorage.setItem('currency', data_6.hourlyRateCurrency);
        await AsyncStorage.setItem('salaryFrom', data_6.salaryRateFrom == null ? "0" : data_6.salaryRateFrom.toString());
        await AsyncStorage.setItem('salaryTo', data_6.salaryRateTo == null ? "0" : data_6.salaryRateTo.toString());
        await AsyncStorage.setItem('relocation', data_6.relocation.toString());
    }

    fetchData = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        let cityId = await AsyncStorage.getItem("cityId") ? await AsyncStorage.getItem("cityId") : 0;

        // let api_0 = "https://api-beta.skilent.com/api/candidate-dashboard/assigned-jobs?range=week";
        // let api_1 = "https://api-beta.skilent.com/api/candidate-dashboard/applied-jobs?range=week";
        // let api_2 = "https://api-beta.skilent.com/api/candidate-invites/my-invites";
        // let api_3 = "https://api-beta.skilent.com/api/candidate-invites/accepted-invites?range=week";
        // let api_4 = "https://api-beta.skilent.com/api/profile";
        // let api_5 = "https://api-beta.skilent.com/api/notifications/unread";

        const req_0 = axios.get(api.dashboard_api_0, config);
        const req_1 = axios.get(api.dashboard_api_1, config);
        const req_2 = axios.get(api.dashboard_api_2, config);
        const req_3 = axios.get(api.dashboard_api_3, config);
        const req_4 = axios.get(api.dashboard_api_4, config);
        const req_5 = axios.get(api.dashboard_api_5, config);
        const req_6 = axios.get(api.profile_emp, config);
        const req_7 = axios.get(`https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId}%7D`, config)

        try {
            axios.all([req_0, req_1, req_2, req_3, req_4, req_5, req_6, req_7])
                .then(
                    axios.spread((...responses) => {

                        this.setState({
                            data_0: responses[0].data.data,
                            data_1: responses[1].data.data,
                            data_2: responses[2].data.data,
                            data_3: responses[3].data.data,
                            data_4: responses[4].data.data,
                            data_5: responses[5].data.data,
                            data_6: responses[6].data.data,
                            data_7: responses[7].data.data,
                        })
                        this.setRecommenedValues();
                    })
                )
                .catch((error) => {
                    console.log(error.response.data);
                }).finally(() => {
                    this.setState({
                        loading: false
                    })
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Header
                    text={this.state.data_4.firstName ? this.state.data_4.firstName + " " + this.state.data_4.lastName : ""}
                    colour={colours.skilent_textPrimary}
                    avtar
                    avtImage={this.state.data_4.avtar == null ? { uri: `https://skilent.sfo2.digitaloceanspaces.com/${this.state.data_4.avatar}` } : require('./../../../assets/images/avtar.png')}
                    avtSize={25}
                    avtOnPress={() => this.props.navigation.navigate('Profile', { profileData: this.state.data_4 })}
                    notify
                    notifyCount={this.state.data_5.length}
                    notifyOnPress={() => this.props.navigation.navigate("Notifications")} />

                <Separator />

                <View style={styles.cardContainer}>

                    <DashCard
                        leftIcon="recommend"
                        leftIconType="MatIcon"
                        leftHeading="Recommended Jobs"
                        leftCount={this.state.data_7.length == 1 ? this.state.data_7.length + " Job" : this.state.data_7.length + " Jobs"}
                        leftCardOnPress={() => this.props.navigation.navigate('Recommended')}

                        rightIcon="local-activity"
                        rightIconType="MatIcon"
                        rightHeading="Recent Activity"
                        rightCount="0 Activity" />

                    <DashCard
                        leftIcon="assignment-turned-in"
                        leftIconType="MatIcon"
                        leftHeading="Assigned Jobs"
                        leftCount={this.state.data_0.length == 1 ? this.state.data_0.length + " Job" : this.state.data_0.length + " Jobs"}
                        leftCardOnPress={() => this.props.navigation.navigate('Assigned')}

                        rightIcon="briefcase-check"
                        rightIconType="MatComIcon"
                        rightHeading="Applied Jobs"
                        rightCount={this.state.data_1.length == 1 ? this.state.data_1.length + " Job" : this.state.data_1.length + " Jobs"}
                        rightCardOnPress={() => this.props.navigation.navigate('Applied')}
                    />

                    <DashCard
                        leftIcon="person-add"
                        leftIconType="IonIcon"
                        leftHeading="Invited Candidates"
                        leftCount={this.state.data_2.length == 1 ? this.state.data_2.length + " Invitee" : this.state.data_2.length + " Invitees"}

                        rightIcon="pending-actions"
                        rightIconType="MatIcon"
                        rightHeading="Pending Candidates"
                        rightCount={this.state.data_3.length == 1 ? this.state.data_3.length + " Invitee" : this.state.data_3.length + " Invitees"}
                    />


                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1
    },

    workingContainer: {
        // flex: 1,
        marginLeft: dimensions.skilent_margin,
        marginEnd: dimensions.skilent_padding,
    },

    cardContainer: {
        flex: 1,
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
        margin: dimensions.skilent_margin
    },

    rowOne: {
        flexDirection: 'row',
        flex: 1,
    },

    leftCard: {
        flex: 1,
        borderRadius: dimensions.screenHeight / 160,
        borderWidth: 0.5,
        borderColor: colours.skilent_primary,
        marginRight: dimensions.skilent_half_margin,
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
        padding: dimensions.skilent_half_padding,
        justifyContent: 'space-between'
    },

    rightCard: {
        flex: 1,
        borderRadius: dimensions.screenHeight / 160,
        borderWidth: 0.5,
        borderColor: colours.skilent_primary,
        marginLeft: dimensions.skilent_half_margin,
        marginTop: dimensions.skilent_half_margin,
        marginBottom: dimensions.skilent_half_margin,
        padding: dimensions.skilent_half_padding,
        justifyContent: 'space-between'
    },

    iconContainer: {
        backgroundColor: colours.skilent_lightBackground,
        height: dimensions.screenHeight / 15,
        width: dimensions.screenHeight / 15,
        borderRadius: dimensions.screenHeight / 140,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
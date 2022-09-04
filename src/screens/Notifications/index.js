import { FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import Information from '../../components/Information';
import Loader from '../../components/Loader';
import NotificationCard from '../../components/NotificationCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Separator from '../../components/Separator';
import api from '../../../assets/api';
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            notifData: []
        };
    }

    componentDidMount = () => {
        this.fetchNotification();
    }

    fetchNotification = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: true
            })
            axios.get(api.notification, config)
                .then((response) => {
                    console.log(response.data.data.length);
                    this.setState({
                        notifData: response.data.data
                    })
                })
                .catch((error) => {
                    console.error(error.response.data);
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

    _formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    _notificationItem = (item) => {
        let d = new Date(item.createdAt);

        return (
            <NotificationCard
                boldStyle={item.viewedAt == null ? { fontWeight: "bold" } : { fontWeight: "normal" }}
                onPress={() => console.log('Pressed')}
                heading={item.payload.job.title}
                message={item.type}
                time={(d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + " " + this._formatAMPM(d)} />
        )
    }

    render() {
        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Header text="Notifications" colour={colours.skilent_textPrimary} arrow />

                    <Separator />

                    {
                        this.state.notifData.length == 0

                            ?
                            this.state.loading ? <></> : <Information infoText="Your don't have any notifications" />
                            :
                            <FlatList
                                keyExtractor={(item, index) => item.id.toString()}
                                data={this.state.notifData}
                                renderItem={({ item }) => this._notificationItem(item)}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                    }




                </SafeAreaView>
            </>
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
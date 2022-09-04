import { FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatButton from '../../components/FloatButton';
import Header from '../../components/Header';
import Information from '../../components/Information';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import Toast from '../../components/Toast';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';
import { locations } from '../../../assets/model/locations';

export default class Assigned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            searchTerm: '',
            jobsData: [],

            counter: 1,
            isActionButtonVisible: true
        };
    }


    componentDidMount() {
        this._getJobs();
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this._getJobs();
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    _getJobs = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: true
            })
            axios.get(api.candidate_jobs + "?scope=submitted", config)
                .then((response) => {
                    console.log(response.data.data.length)
                    this.setState({
                        jobsData: response.data.data,
                    });
                })
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

    _refreshJobs = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            axios.get(api.candidate_jobs + "?scope=submitted", config)
                .then((response) => {
                    this.setState({
                        jobsData: response.data.data
                    });
                    console.log(response.data.data);
                })
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

    _saveJob = async (id) => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: true
            })
            axios.post(api.candidate_save_job + id, null, config)
                .then((response) => {
                    console.log(response)
                    // this.refs.customToast.showToast('Job Saved', 2000);
                    this.setState({
                        loading: false
                    })
                    this._refreshJobs();
                })
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

    _jobItem = (item) => {
        return (
            <JobCard
                onPress={() => this.props.navigation.navigate('JobDetails', { jobDetail: item })}
                // org={item.client && item.client.companyName}
                org={"ComtechLLC / CISPL"}
                title={item.title}
                skills={item.educationRequirement}
                location={item.city.name + ", " + item.country.name}
                travel={item.travel}
                relocation={item.relocation}
                saveVisible={true}
                isSave={item.isFavorite}
                onPressSave={() => { this._saveJob(item.id) }}
            />
        )
    }

    _listViewOffset = 0;

    _onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 100,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up'
        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isActionButtonVisible })
        }
        // Update your scroll position
        this._listViewOffset = currentOffset
    }


    navigateToMap = (jobsData) => {
        // const arr = [{value: 1}, {value: 1}, {value: 2}]

        // const newArr = arr.map(v => {
        //   return v.value > 1 ? {...v, isActive: true} : v 
        // })

        jobsData.forEach(v => {
            try {
                //To find the perticuler object value in an array of objects
                let obj = locations.find(o => o.city === v.city.name);

                //To add a key value pair to each array of object elements 
                v.coordinate = {
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        this.props.navigation.navigate('MapsView', { jobsData: jobsData })
    }

    render() {
        const { jobsData } = this.state;

        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                    <Header arrow={true} text="Applied Jobs" colour={colours.skilent_textPrimary} />

                    <Separator />

                    <View style={styles.workingContainer}>

                        {
                            jobsData.length == 0

                                ?
                                this.state.loading ? <></> : <Information infoText="You have not applied for any job" />
                                :
                                <FlatList
                                    keyExtractor={(item, index) => item.id.toString()}
                                    data={jobsData}
                                    renderItem={({ item }) => this._jobItem(item)}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    // onEndReached={() => this._loadMore()}
                                    onEndReachedThreshold={1}
                                    onScroll={this._onScroll}
                                />
                        }

                        {
                            this.state.isActionButtonVisible && jobsData.length != 0
                                ?
                                <FloatButton title='Map View' onPress={() => this.navigateToMap(jobsData)} />
                                :
                                null
                        }

                    </View>

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
import { Body_1, Body_2, Subtitle } from '../../components/Fonts';
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
import Slider from '@react-native-community/slider';
import Toast from './../../components/Toast';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';
import { locations } from '../../../assets/model/locations';

export default class Recommended extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            jobsData: [],

            isActionButtonVisible: true,
            value: 0,

            cityId: null,
            tagIdArray: null,
            rateFrom: null,
            rateTo: null,
            currency: null,
            salaryFrom: null,
            salaryTo: null,
            relocation: null

        };
    }

    componentDidMount() {
        this.createURL();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.createURL();
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription();
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    createURL = async () => {
        let url = '';
        const x = this.state.value;
        let { cityId, tagIdArray, rateFrom, rateTo, currency, salaryFrom, salaryTo, relocation } = this.state;

        cityId = await AsyncStorage.getItem("cityId");
        tagIdArray = await AsyncStorage.getItem("tagIdArray");
        rateFrom = await AsyncStorage.getItem("rateFrom");
        rateTo = await AsyncStorage.getItem("rateTo");
        currency = await AsyncStorage.getItem("currency");
        salaryFrom = await AsyncStorage.getItem("salaryFrom");
        salaryTo = await AsyncStorage.getItem("salaryTo");
        relocation = await AsyncStorage.getItem("relocation");

        // https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:3075787,%22tagIds%22:[%2211512%22],%22rateFrom%22:%2210%22,%22rateTo%22:%2220%22,%22rateCurrency%22:%22USD%22,%22salaryFrom%22:%221000%22,%22salaryTo%22:%221000%22,%22relocation%22:true%7D
        switch (true) {
            case (x < 0.21):
                console.log("1-20");
                url = `https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId}%7D`;
                this._getJobs(url);
                break;

            case (x < 0.41):
                console.log("21-40");
                url = `https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId},%22tagIds%22:[${tagIdArray}]%7D`;
                this._getJobs(url);
                break;

            case (x < 0.61):
                console.log("31-60");
                url = `https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId},%22tagIds%22:[${tagIdArray}],%22rateFrom%22:%22${rateFrom}%22,%22rateTo%22:%22${rateTo}%22,%22rateCurrency%22:%22${currency}%22%7D`;
                this._getJobs(url);
                break;

            case (x < 0.81):
                console.log("61-80");
                url = `https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId},%22tagIds%22:[${tagIdArray}],%22rateFrom%22:%22${rateFrom}%22,%22rateTo%22:%22${rateTo}%22,%22rateCurrency%22:%22${currency}%22,%22salaryFrom%22:%22${salaryFrom}%22,%22salaryTo%22:%22${salaryTo}%22%7D`;
                this._getJobs(url);
                break;
            // https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:5688286,%22tagIds%22:[%2222167%22],%22rateFrom%22:%2255%22,%22rateTo%22:%2265%22,%22rateCurrency%22:%22USD%22,%22salaryFrom%22:%221000%22,%22salaryTo%22:%221000%22%7D
            case (x <= 1):
                console.log("81-100");
                url = `https://api-beta.skilent.com/api/candidate/jobs?scope=all&filter=%7B%22cityId%22:${cityId},%22tagIds%22:[${tagIdArray}],%22rateFrom%22:%22${rateFrom}%22,%22rateTo%22:%22${rateTo}%22,%22rateCurrency%22:%22${currency}%22,%22salaryFrom%22:%22${salaryFrom}%22,%22salaryTo%22:%22${salaryTo}%22,%22relocation%22:${relocation}%7D`;
                this._getJobs(url);
                break;
        }
        console.log(url);
    }

    _getJobs = async (url) => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: true
            })
            axios.get(url, config)
                .then((response) => {
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
            axios.get(api.candidate_jobs, config)
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
                loading: false
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
        const { jobsData, value } = this.state;

        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                    <Header arrow={true} text="Recommended Jobs" colour={colours.skilent_textPrimary} />

                    <Separator />

                    <View style={styles.workingContainer}>
                        {
                            this.state.isActionButtonVisible
                                ?
                                <>
                                    <View style={styles.sliderHeading} >
                                        <Subtitle arrow={true} text="Match Properties" colour={colours.skilent_textPrimary} />
                                        <Body_1 arrow={true} text={Math.floor(this.state.value * 100) + " %"} colour={colours.skilent_textPrimary} />
                                    </View>

                                    <Slider
                                        style={{
                                            width: '100%',
                                            marginBottom: dimensions.skilent_half_margin,
                                        }}
                                        minimumValue={0}
                                        maximumValue={1}
                                        minimumTrackTintColor={colours.skilent_primary}
                                        maximumTrackTintColor={colours.skilent_mediumBackground}
                                        thumbTintColor={colours.skilent_primary}
                                        onSlidingComplete={() => { this.createURL() }}
                                        onValueChange={(value) => { this.setState({ value: value }) }}
                                        step={0.1}
                                        value={value}
                                    />
                                </>
                                :
                                null
                        }

                        {
                            jobsData.length == 0

                                ?
                                this.state.loading ? <></> : <Information infoText={"No recommended jobs right now"} />
                                :
                                <FlatList
                                    keyExtractor={(item, index) => item.id.toString()}
                                    data={jobsData}
                                    renderItem={({ item }) => this._jobItem(item)}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    // onEndReached={() => this._loadMore()}
                                    onScroll={this._onScroll}
                                    onEndReachedThreshold={1}
                                />
                        }

                        {
                            this.state.isActionButtonVisible && jobsData.length != 0
                                ?
                                <FloatButton title='Map View' onPress={() => this.navigateToMap(this.state.jobsData)} />
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
    },
    sliderHeading: {
        marginTop: dimensions.skilent_half_margin,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    }
});
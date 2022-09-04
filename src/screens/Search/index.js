import { FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatButton from '../../components/FloatButton';
import Header from '../../components/Header';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import Margin from '../../components/Margin';
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import { Subtitle } from '../../components/Fonts';
import Toast from './../../components/Toast';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import { createFilter } from 'react-native-search-filter';
import dimensions from '../../../assets/dimensions';
import { locations } from '../../../assets/model/locations';

const KEYS_TO_FILTERS = ['title', 'educationRequirement '];

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            searchTerm: '',
            jobsData: [],

            counter: 1,

            isActionButtonVisible: true,

            ShowComment: false,
            animateModal: false
        };
    }

    componentDidMount() {
        this._getJobs();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this._getJobs();
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription();
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
            axios.get(api.candidate_jobs, config)
                .then((response) => {
                    this.setState({
                        jobsData: response.data.data,
                        counter: this.state.counter + 1
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

    _renderBottomSheet = () => {
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={(dimensions.screenHeight / 1.3)}
                openDuration={200}
                closeDuration={200}
                animationType={'fade'}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                customStyles={{
                    container: {
                        borderTopLeftRadius: dimensions.skilent_margin,
                        borderTopRightRadius: dimensions.skilent_margin,
                    }
                }}
                onClose={() => console.log('Closing')}
                onOpen={() => console.log('Opening')}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    marginHorizontal: dimensions.skilent_margin,
                    paddingTop: dimensions.skilent_half_padding
                }}>
                    <Subtitle text={"Filters"} />
                    {/* <RangeSlider
                        type="range" // ios only
                        min={0}
                        max={100}
                        selectedMinimum={20} // ios only
                        selectedMaximum={60} // ios only
                        tintColor={colours.skilent_textSecondary}
                        handleColor={colours.skilent_primary}
                        handlePressedColor={colours.skilent_primary}
                        tintColorBetweenHandles={colours.skilent_primary}
                        onChange={this.onChange}
                    />

                    <RangeSlider
                        type="range" // ios only
                        min={0}
                        max={10000}
                        selectedMinimum={5000} // ios only
                        selectedMaximum={8000} // ios only
                        tintColor={colours.skilent_textSecondary}
                        handleColor={colours.skilent_primary}
                        handlePressedColor={colours.skilent_primary}
                        tintColorBetweenHandles={colours.skilent_primary}
                        onChange={this.onChange}
                    /> */}
                </ScrollView>
            </RBSheet >
        );
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
                console.log(e)
            }

        });

        this.props.navigation.navigate('MapsView', { jobsData: jobsData })
    }

    render() {
        const { jobsData } = this.state;
        const filteredJobs = jobsData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    {this._renderBottomSheet()}

                    <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                    <Header text="Search Jobs" colour={colours.skilent_textPrimary} />

                    <SearchBar
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        returnKeyType='go'
                        ref={input => { this.searchTerm = input; }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        searchText={this.state.searchTerm}
                        filters={true}
                        filterOnPress={() => this.RBSheet.open()} 
                        />

                    <View style={styles.workingContainer}>
                        <FlatList
                            keyExtractor={(item, index) => item.id.toString()}
                            data={filteredJobs}
                            renderItem={({ item }) => this._jobItem(item)}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            // onEndReached={() => this._loadMore()}
                            onScroll={this._onScroll}
                            onEndReachedThreshold={1}
                        />

                        {this.state.isActionButtonVisible
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

    containerContent: { flex: 1, marginTop: 40 },
    containerHeader: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#F1F1F1',
    },
    headerContent: {
        marginTop: 0,
    },
    Modal: {
        backgroundColor: '#005252',
        marginTop: 0,
    }
});
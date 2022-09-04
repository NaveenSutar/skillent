import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import Header from '../../components/Header';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import { createFilter } from 'react-native-search-filter';
import dimensions from '../../../assets/dimensions';

const KEYS_TO_FILTERS = ['title', 'educationRequirement '];

export default class GuestJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            searchTerm: '',
            jobsData: [],

            counter: 1,
        };
    }

    componentDidMount = () => {
        this._getJobs()
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this._getJobs()
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
        try {
            this.setState({
                loading: true
            })
            axios.get(api.guestJobs)
                .then((response) => {
                    this.setState({
                        jobsData: response.data.data,
                        counter: this.state.counter + 1
                    });
                    // console.log(response.data.data);
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

    _loadMore = async () => {
        try {
            this.setState({
                loading: true
            })
            axios.get(api.guestJobs + "?page=" + this.state.counter)
                .then((response) => {
                    this.setState({
                        jobsData: [...this.state.jobsData, ...response.data.data],
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

    _jobItem = (item) => {
        return (
            <JobCard
                onPress={() => this.props.navigation.navigate('GuestJobDetails', { jobDetail: item })}
                org={"ComtechLLC / CISPL"}
                title={item.title}
                skills={item.educationRequirement}
                location={item.city.name + ", " + item.country.name}
                travel={item.travel}
                relocation={item.relocation}

            />
        )
    }

    render() {
        const { jobsData } = this.state;
        const filteredJobs = jobsData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container}>

                    <Header text="Search Jobs" colour={colours.skilent_textPrimary} />

                    <SearchBar
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        returnKeyType='go'
                        ref={input => { this.searchTerm = input; }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        clearButtonMode='while-editing'
                        searchText={this.state.searchTerm} />

                    <View style={styles.workingContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <FlatList
                                keyExtractor={(item, index) => item.id.toString()}
                                data={filteredJobs}
                                renderItem={({ item }) => this._jobItem(item)}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                // onEndReached={() => this._loadMore()}
                                onEndReachedThreshold={1}
                            />

                        </ScrollView>
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
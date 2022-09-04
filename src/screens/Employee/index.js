import { PermissionsAndroid, ScrollView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Header from '../../components/Header';
import Information from '../../components/Information';
import PersonalCard from '../../components/PersonalCard';
import RNFetchBlob from 'rn-fetch-blob';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import Toast from './../../components/Toast';
import api from '../../../assets/api';
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            empData: null,
            resData: null
        };
    }

    componentDidMount = () => {
        this._getEmpDetails();
    }

    checkPermission = async () => {
        if (Platform.OS === 'ios') {
            this.downloadResume();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    this.downloadResume();
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    }

    downloadResume = () => {
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = `https://skilent.sfo2.digitaloceanspaces.com/${this.state.resData.path}`;
        // Function to get extention of the file url
        let file_ext = this.getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,
            },
        };

        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // Alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                console.log(res);
                this.refs.customToast.showToast('Resume Downloaded Successfully.', 2000);
            });
    };

    getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };

    _getEmpDetails = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        const req_0 = axios.get(api.profile_emp, config);
        const req_1 = axios.get(api.profile_res, config);

        try {
            this.setState({
                loading: true
            })
            axios.all([req_0, req_1])
                .then(
                    axios.spread((...responses) => {
                        this.setState({
                            empData: responses[0].data.data,
                            resData: responses[1].data.data,
                        })
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
        const { empData, resData } = this.state;

        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="bottom" />
                <Header
                    text="Employee Details"
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
                        icon_name="ios-cash"
                        line_1={`${empData && empData.hourlyRateFrom == null ? `0` : empData && empData.hourlyRateFrom}${empData && empData.hourlyRateTo == null ? `` : ` - ${empData && empData.hourlyRateTo}`} USD`}
                        line_2="Hourly Rate"
                    />

                    <PersonalCard
                        icon_name="ios-cash"
                        line_1={`${empData && empData.salaryRateFrom == null ? `0`: empData && empData.salaryRateFrom}${empData && empData.salaryRateTo == null ? `` : ` - ${empData && empData.salaryRateTo}`} USD`}
                        line_2="Annuel Salary Rate"
                    />

                    <PersonalCard
                        icon_name="location"
                        line_1={empData && empData.relocation ? "Available" : "Not Availabble"}
                        line_2="Relocation"
                    />

                    <PersonalCard
                        icon_name="ios-cog"
                        line_1={empData && empData.skills.length == 0 ? "-" : empData && empData.skills.map((skill, i, arr) => `${skill.name}${i != (arr.length - 1) ? ', ' : ''}`)}
                        line_2="Skills"
                    />

                    <PersonalCard
                        icon_name="document-text"
                        line_1={empData && empData.softSkills ? empData && empData.softSkills : "-"}
                        line_2="Notes"
                    />

                    <PersonalCard
                        right_Icon={resData == null ? false : true}
                        rigth_Icon_Name={"cloud-download-outline"}
                        right_Icon_Press={() => { this.checkPermission() }}
                        icon_name="document-attach"
                        line_1={resData == null ? "Not Available" : "Resume Available"}
                        line_2="Resume"
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
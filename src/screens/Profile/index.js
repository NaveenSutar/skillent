import { Body_1, Subtitle } from '../../components/Fonts';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Avtar from '../../components/Avtaar';
import Header from '../../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Margin from '../../components/Margin';
import MoreCard from './../../components/MoreCard'
import RNFS from 'react-native-fs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import Toast from './../../components/Toast';
import api from '../../../assets/api';
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            profileData: this.props.route.params.profileData,
            imagePath: null
        };
    }

    componentDidMount = () => {
        console.log(this.state.profileData);
    }

    _changeAvtar = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            cropperActiveWidgetColor: colours.skilent_primary,
            cropperStatusBarColor: colours.skilent_primary,
            showCropGuidelines: true,
            compressImageQuality: 0.5,
            showCropFrame: true,
        }).then(async (imageData) => {
            this.setState({
                loading: true,
            });

            const tokan = await AsyncStorage.getItem('skilent_tokan');

            var uri = imageData.sourceURL;
            var img = 'file:///' + (uri.replace('file://', '')); // Must do that for RNFS

            RNFS.readFile(img, 'base64') // 'base64' to process binary format
                .then((file) => {
                    var data = new FormData();
                    data.append('avatar', uri);

                    var config = {
                        method: 'post',
                        url: 'https://api-beta.skilent.com/api/profile/avatar',
                        headers: {
                            'Connection': 'keep-alive',
                            'Pragma': 'no-cache',
                            'Cache-Control': 'no-cache',
                            'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryLgSpCUAJd39iiqhL',
                            'Authorization': 'Bearer ' + tokan,
                            'sec-ch-ua-mobile': '?0',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                            'sec-ch-ua-platform': '"macOS"',
                            'Origin': 'https://skilent.com',
                            'Sec-Fetch-Site': 'same-site',
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Dest': 'empty',
                            'Referer': 'https://skilent.com/',
                            'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
                            ...data.getAll
                        },
                        data: data
                    };

                    axios(config)
                        .then(response => console.log(response))
                        .catch(error => console.log('error', error));
                })

            //Fetch

            // var myHeaders = new Headers();
            // myHeaders.append("Connection", "keep-alive");
            // myHeaders.append("Pragma", "no-cache");
            // myHeaders.append("Cache-Control", "no-cache");
            // myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"");
            // myHeaders.append("Accept", "application/json, text/plain, */*");
            // myHeaders.append("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundaryLgSpCUAJd39iiqhL");
            // myHeaders.append("Authorization", "Bearer " + tokan);
            // myHeaders.append("sec-ch-ua-mobile", "?0");
            // myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36");
            // myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
            // myHeaders.append("Origin", "https://skilent.com");
            // myHeaders.append("Sec-Fetch-Site", "same-site");
            // myHeaders.append("Sec-Fetch-Mode", "cors");
            // myHeaders.append("Sec-Fetch-Dest", "empty");
            // myHeaders.append("Referer", "https://skilent.com/");
            // myHeaders.append("Accept-Language", "en-US,en;q=0.9,fr;q=0.8");

            // var formdata = new FormData();
            // formdata.append("avatar", null, img);

            // var requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: formdata,
            //     redirect: 'follow'
            // };

            // fetch("https://api-beta.skilent.com/api/profile/avatar", requestOptions)
            //     .then(response => console.log(response))
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error));


            //https://stackoverflow.com/questions/48275725/react-native-invalid-utf-8-detected-while-trying-to-read-a-image-file
            //https://stackoverflow.com/questions/48747278/is-it-possible-to-get-the-binary-data-from-an-image-in-react-native
        });


    };

    _logout = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            axios.delete(api.sign_out, config)
                .then(async (response) => {
                    // await this.refs.customToast.showToast('You have been successfully logged out', 2000);
                    await AsyncStorage.removeItem('skilent_tokan');
                    await AsyncStorage.removeItem('loginTime');
                    await setTimeout(async () => {
                        await this.props.navigation.reset({
                            index: 1,
                            routes: [{ name: 'SignIn' }],
                        });
                    }, 500);
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

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                <Header text="Profile" colour={colours.skilent_textPrimary} arrow />

                <Separator />
                <View style={{ margin: dimensions.skilent_margin }}>
                    <View style={{ width: dimensions.screenHeight / 10 }}>

                        <Avtar size={9.5} noBorder
                            image={this.state.profileData.avtar == null ? { uri: `https://skilent.sfo2.digitaloceanspaces.com/${this.state.profileData.avatar}` } : require('./../../../assets/images/avtar.png')} />
                        <TouchableOpacity
                            onPress={() => this._changeAvtar()}
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: colours.skilent_primary,
                                position: 'absolute',
                                padding: dimensions.skilent_half_padding / 3,
                                borderRadius: dimensions.skilent_padding,
                                bottom: dimensions.skilent_half_padding / 1.5,
                                right: 0
                            }}>
                            <IonIcon name="camera" size={dimensions.screenHeight / 45} color={colours.skilent_white} />
                        </TouchableOpacity>
                    </View>
                    <Margin margin={0.5} />
                    <Subtitle text={this.state.profileData.firstName ? this.state.profileData.firstName + " " + this.state.profileData.lastName : ""} colour={colours.skilent_textPrimary} />
                    <Margin margin={0.5} />
                    <Body_1 text={this.Capitalize(this.state.profileData.role)} colour={colours.skilent_textPrimary} />
                </View>

                <MoreCard
                    onPress={() => this.props.navigation.navigate('Personal', { profileData: this.state.profileData })}
                    option_name="Personal Details"
                    icon_name="md-person-circle-outline" />

                <MoreCard
                    onPress={() => this.props.navigation.navigate('Employee')}
                    option_name="Employee Details"
                    icon_name="at-circle" />

                <MoreCard
                    onPress={() => this.props.navigation.navigate('Education')}
                    option_name="Education Details"
                    icon_name="book" />

                <MoreCard
                    onPress={() => this.props.navigation.navigate('WorkExperience')}
                    option_name="Work Experience Details"
                    icon_name="briefcase" />

                <MoreCard
                    onPress={() => this.props.navigation.navigate('ChangePassword')}
                    option_name="Change Password"
                    icon_name="shield-checkmark" />

                <MoreCard
                    onPress={() => this._logout()}
                    option_name="Logout"
                    icon_name="log-out" />
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
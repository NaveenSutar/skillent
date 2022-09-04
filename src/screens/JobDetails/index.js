import { ActivityIndicator, Alert, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Body_1, Body_2, Heading_2, Heading_3 } from '../../components/Fonts';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Information from '../../components/Information';
import JobDetailElement from '../../components/JobDetailElement';
import Margin from '../../components/Margin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../../components/Separator';
import Toast from './../../components/Toast';
import TwoButton from '../../components/TwoButton';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            applyLoading: false,
            saveLoading: false,
            modalLoading: false,

            jobDetail: this.props.route.params.jobDetail,

            isJobRemoved: false,

            ModalVisibleStatus: false,

            shareEmail: '',
            isShareEmailValid: true,
            shareEmailLabel: '',

            shareEmailBorderColor: colours.skilent_textSecondary,
            shareEmailPlaceHolderColor: null,
            shareEmailLabelText: null,
            shareEmailTextColour: colours.skilent_textPrimary,

        };
    }

    componentDidMount = () => {
        this._getJobDetail();
    }

    ShowModalFunction = (visible) => {
        this.setState({
            ModalVisibleStatus: visible,
            shareEmail: []
        })
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    handleSaveChange = (isFavorite) => {
        this.setState(
            (prevState) => ({
                jobDetail: Object.assign({}, prevState.jobDetail, {
                    isFavorite: !isFavorite
                })
            })
        )
    }

    _getJobDetail = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };
        try {
            this.setState({
                loading: true
            })

            axios.get(api.candidate_apply_job + this.state.jobDetail.id, config)
                .then((response) => {
                    console.log(response.data.data)
                    this.setState({
                        jobDetail: response.data.data
                    });
                })
                .catch((error) => {
                    console.error(error.response.data);
                    if (error.response.data.statusCode === 403) {
                        this.setState({
                            isJobRemoved: true
                        })
                    }
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

    _refreshJobDetail = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };
        try {
            this.setState({
                applyLoading: true
            })

            axios.get(api.candidate_apply_job + this.state.jobDetail.id, config)
                .then((response) => {
                    this.setState({
                        jobDetail: response.data.data
                    });
                })
                .catch((error) => {
                    console.log(error.response.data);
                }).finally(() => {
                    this.setState({
                        applyLoading: false
                    })
                });

        }
        catch (error) {
            console.error(error);
        }
    }

    _saveJob = async (id, isFavorite) => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                saveLoading: true
            })
            axios.post(api.candidate_save_job + id, null, config)
                .then((response) => {
                    console.log(response)
                    this.setState({
                        saveLoading: false
                    })
                    this.handleSaveChange(isFavorite);
                })
                .catch((error) => {
                    console.log(error.response.data);
                }).finally(() => {
                    this.setState({
                        saveLoading: false
                    })
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    _applyJob = async (job_id) => {
        console.log(job_id);
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };
        try {
            this.setState({
                applyLoading: true
            })
            axios.post(api.candidate_apply_job + job_id + '/assign', null, config)
                .then((response) => {
                    console.log(response)
                    this._refreshJobDetail();
                })
                .catch((error) => {
                    console.log(error.response.data);
                }).finally(() => {
                    console.log('End reached');
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    _acceptJob = async (job_id) => {
        console.log(job_id);
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };
        try {
            this.setState({
                applyLoading: true
            })
            axios.post(api.candidate_apply_job + job_id + '/accept', null, config)
                .then((response) => {
                    console.log(response)
                    this._refreshJobDetail();
                })
                .catch((error) => {
                    console.log(error.response.data);
                }).finally(() => {
                    console.log('End reached');
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    _declineJob = async (job_id) => {
        Alert.alert(
            "Warning!",
            "\nAre you sure you want to decline this job?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "YES", onPress: async () => {
                        const config = {
                            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
                        };
                        try {
                            this.setState({
                                applyLoading: true
                            })
                            axios.post(api.candidate_apply_job + job_id + '/cancel', null, config)
                                .then((response) => {
                                    console.log(response)
                                    this._refreshJobDetail();
                                })
                                .catch((error) => {
                                    console.log(error.response.data);
                                }).finally(() => {
                                    console.log('End reached');
                                });
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
            ]
        );
    }

    _shareJob = async (id, emails) => {
        var emailObj = [];
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        Keyboard.dismiss();
        if (emails == '') {
            this.setState({
                isShareEmailValid: false,
                shareEmailLabel: "Field can't be empty",
                shareEmailBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Field can\'t be empty', 2000);
        }
        // else if (email == '') {
        //     this.setState({
        //         isEmailValid: false,
        //         emailLabel: 'Email can\'t be empty',
        //         emailBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Email can\'t be empty', 2000);
        // } 
        else {
            let emailArr = emails.split(',');
            let len = emailArr.length;

            for (var i = 0; i < len; i++) {
                emailObj.push({
                    "email": emailArr[i]
                });
            }

            data = {
                "emails": emailObj,
                "jobId": id.toString()
            }

            try {
                this.setState({
                    modalLoading: true
                })
                axios.post(api.candidate_share_job, data, config)
                    .then((response) => {
                        this.setState({
                            modalLoading: false,
                            shareEmail: '',
                            ModalVisibleStatus: false,
                        })
                        this.refs.customToast.showToast('Job shared successfully', 2000);
                    })
                    .catch((error) => {
                        console.warn(error.response.data);
                        if (error.response.data.statusCode == 401) {
                            this.refs.customToast.showToast('Unauthorized', 2000);
                        } else if (error.response.data.statusCode == 403) {
                            this.refs.customToast.showToast('Wrong Password', 2000);
                        } else if (error.response.data.statusCode == 404) {
                            this.refs.customToast.showToast('User not found', 2000);
                        } else if (error.response.data.statusCode == 422) {
                            this.refs.customToast.showToast('Validation error', 2000);
                        } else {
                            this.refs.customToast.showToast('Something went wrong', 2000);
                        }
                    }).finally(() => {
                        this.setState({ modalLoading: false })
                    });
            }
            catch (error) {
                console.error(error);
            }
        }


    }

    shareModal = () => {
        const { jobDetail } = this.state;
        return (
            <Modal
                onNavigate={this.onNavigate}
                transparent={true}
                animationType={'fade'}
                visible={this.state.ModalVisibleStatus}
                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus); }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInsideView}>
                        <Heading_2 text="Share Job" colour={colours.skilent_textPrimary} />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus)} style={{ position: 'absolute', right: dimensions.skilent_margin, top: dimensions.skilent_margin }}>
                            <Icon type="IonIcon" name={"close"} size={dimensions.screenHeight / 30} color={colours.skilent_textPrimary} />
                        </TouchableOpacity>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.shareEmailLabelText
                                        }
                                    ]
                                }
                                text="Enter email addresses"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                label="School / College / University"
                                placeholder="Email id's separated by a comma"
                                returnKeyType="next"
                                onSubmitEditing={() => this._shareJob(jobDetail.id)}

                                autoCapitalize='none'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={1000}
                                keyboardType='default'

                                value={this.state.shareEmail}
                                ref={input => this.shareEmail = input}
                                onChangeText={shareEmail => this.setState({ shareEmail: shareEmail, isShareEmailValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.shareEmailPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        shareEmailBorderColor: colours.skilent_primary,
                                        shareEmailPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        shareEmailLabelText: "600",
                                        shareEmailTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        shareEmailBorderColor: colours.skilent_textSecondary,
                                        shareEmailPlaceHolderColor: null,
                                        shareEmailLabelText: null,
                                        shareEmailTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 20,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.shareEmailTextColour,
                                    borderColor: this.state.shareEmailBorderColor
                                }}
                            />
                        </>

                        <Button style={{ height: dimensions.screenHeight / 20 }} onPress={() => this._shareJob(jobDetail.id, this.state.shareEmail)}
                            title={
                                this.state.modalLoading ? <ActivityIndicator size="small" color="#fff" /> : 'SHARE'
                            } />
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        const { jobDetail } = this.state;
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                {this.shareModal()}
                <Header
                    text="Description"
                    colour={colours.skilent_textPrimary}
                    arrow={true}
                    arrowOnpress={() => this.props.navigation.goBack()}
                    rightIcon={this.state.loading || this.state.isJobRemoved ? false : true}
                    rightIconColour={colours.skilent_primary}
                    rightIconName={jobDetail.isFavorite ? "bookmark" : "bookmark-outline"}
                    rightIconsize={30}
                    rightIconPress={() => { this._saveJob(jobDetail.id, jobDetail.isFavorite) }}
                />

                <Separator />

                {
                    this.state.loading || this.state.isJobRemoved
                        ?
                        this.state.loading ? null : <Information infoText="This job has been expired" />
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ margin: dimensions.skilent_margin }}>
                                <JobDetailElement
                                    title={jobDetail.title}
                                    text1={jobDetail.employmentType.map((d, i, arr) => <Text>{this.Capitalize(d).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                                    text2={jobDetail.spheres.map((d, i, arr) => <Text>{this.Capitalize(d.name).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                                    text3={"$" + jobDetail.rateFrom + (jobDetail.rateTo == null ? "" : " - $" + jobDetail.rateTo) + "/Hourly, "}
                                    text4={(jobDetail.salaryFrom && jobDetail.salaryTo) && ("$" + jobDetail.salaryFrom + " - " + "$" + jobDetail.salaryTo + "/Yearly")}
                                    text5={jobDetail.clearanceType.map((d, i, arr) => <Text>{this.Capitalize(d).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                                    text6={jobDetail.employeeType.map((d, i, arr) => <Text>{this.Capitalize(d).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                                    text7={jobDetail.city.name + ", " + jobDetail.country.name} />
                            </View>

                            <Separator />

                            <View style={{ margin: dimensions.skilent_margin }}>
                                {
                                    jobDetail.desc && <>
                                        <Heading_3 text="Job Description" colour={colours.skilent_textSecondary} />
                                        <Margin margin={1} />
                                        <Body_1 style={{ lineHeight: dimensions.screenHeight / 35 }} colour={colours.skilent_textPrimary} text={jobDetail.desc} />
                                        <Margin margin={2} />
                                    </>
                                }

                                {
                                    jobDetail.softSkills &&
                                    <>
                                        <Heading_3 text="Skills" colour={colours.skilent_textSecondary} />
                                        <Margin margin={1} />
                                        <Body_1 style={{ lineHeight: dimensions.screenHeight / 35 }} colour={colours.skilent_textPrimary} text={jobDetail.softSkills} />
                                        <Margin margin={2} />
                                    </>
                                }

                                {
                                    jobDetail.educationRequirement &&
                                    <>
                                        <Heading_3 text="Educational Requiremnts" colour={colours.skilent_textSecondary} />
                                        <Margin margin={1} />
                                        <Body_1 style={{ lineHeight: dimensions.screenHeight / 35 }} colour={colours.skilent_textPrimary} text={jobDetail.educationRequirement} />
                                        <Margin margin={6} />
                                    </>
                                }
                            </View>
                        </ScrollView>
                }

                {
                    this.state.loading || this.state.isJobRemoved
                        ?
                        null
                        :
                        jobDetail.canAccept === false && jobDetail.canDecline === false && jobDetail.canSubmit === true
                            ?
                            <TwoButton
                                btn1Title={this.state.applyLoading ? <ActivityIndicator size="small" color="#fff" /> : jobDetail.canDecline ? 'DECLINE' : 'APPLY'}
                                btn2Title={"SHARE"}
                                btn1Onpress={() => jobDetail.canDecline ? this._declineJob(jobDetail.id) : this._applyJob(jobDetail.id)}
                                btn2Onpress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}
                                btn1BGColour={jobDetail.canDecline ? colours.skilent_danger : colours.skilent_primary}
                            />
                            :
                            <TwoButton
                                btn1Title={this.state.applyLoading ? <ActivityIndicator size="small" color="#fff" /> : jobDetail.canDecline ? jobDetail.canAccept ? 'ACCEPT' : 'DECLINE' : 'APPLY'}
                                btn2Title={"SHARE"}
                                btn1Onpress={() => jobDetail.canDecline ? jobDetail.canAccept ? this._acceptJob(jobDetail.id) : this._declineJob(jobDetail.id) : this._applyJob(jobDetail.id)}
                                btn2Onpress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}
                                btn1BGColour={jobDetail.canDecline ? jobDetail.canAccept ? colours.skilent_primary : colours.skilent_danger : colours.skilent_primary}
                            />
                }

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalInsideView: {
        backgroundColor: colours.skilent_white,
        width: dimensions.screenWidth - dimensions.skilent_margin * 2,
        padding: dimensions.skilent_margin,
        paddingBottom: 0,
        borderRadius: dimensions.screenHeight / 200
    },

    label: {
        marginBottom: dimensions.skilent_half_margin / 2,
        marginTop: dimensions.skilent_half_margin
    },
});
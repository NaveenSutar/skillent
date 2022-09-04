import { ActivityIndicator, FlatList, Keyboard, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Body_2, Heading_2, Subtitle } from '../../components/Fonts';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import EducationCard from '../../components/EducationCard';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Information from '../../components/Information';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import Toast from './../../components/Toast';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            updateLoading: false,
            deleteLoading: false,
            eduData: [],

            edu_id: null,

            school: '',
            isSchoolValid: true,
            schoolLabel: '',

            degree: '',
            isDegreeValid: true,
            degreeLabel: '',

            study: '',
            isStudyValid: true,
            studyLabel: '',

            fromYear: '',
            isFromYearValid: true,
            fromYearLabel: '',

            toYear: '',
            isToYearValid: true,
            toYearLabel: '',

            schoolBorderColor: colours.skilent_textSecondary,
            schoolPlaceHolderColor: null,
            schoolLabelText: null,
            schoolTextColour: colours.skilent_textPrimary,

            degreeBorderColor: colours.skilent_textSecondary,
            degreePlaceHolderColor: null,
            degreeLabelText: null,
            degreeTextColour: colours.skilent_textPrimary,

            studyBorderColor: colours.skilent_textSecondary,
            studyPlaceHolderColor: null,
            studyLabelText: null,
            studyTextColour: colours.skilent_textPrimary,

            fromYearBorderColor: colours.skilent_textSecondary,
            fromYearPlaceHolderColor: null,
            fromYearLabelText: null,
            fromYearTextColour: colours.skilent_textPrimary,

            toYearBorderColor: colours.skilent_textSecondary,
            toYearPlaceHolderColor: null,
            toYearLabelText: null,
            toYearTextColour: colours.skilent_textPrimary,

            ModalVisibleStatus: false,
            editModalVisibleStatus: false,
        };
    }

    componentDidMount = () => {
        this._getEdu();
    }

    _getEdu = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: true
            })
            axios.get(api.profile_edu, config)
                .then((response) => {
                    this.setState({
                        eduData: response.data.data,
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

    _addEdu = async (school, degree, study, fromYear, toYear) => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        Keyboard.dismiss();
        if (school == '' && degree == '' && study == '' && fromYear == '' && toYear == '') {
            this.setState({
                isSchoolValid: false,
                isDegreeValid: false,
                isStudyValid: false,
                isFromYearValid: false,
                isToYearValid: false,

                schoolLabel: "School / College / University can't be empty",
                degreeLabel: "Degree can't be empty",
                studyLabel: "Field of Study can't be empty",
                fromYearLabel: "From Year can't be empty",
                toYearLabel: "To Year can't be empty",

                schoolBorderColor: colours.skilent_danger,
                degreeBorderColor: colours.skilent_danger,
                studyBorderColor: colours.skilent_danger,
                fromYearBorderColor: colours.skilent_danger,
                toYearBorderColor: colours.skilent_danger
            })
            this.refs.customToast.showToast('All fields can\'t be empty', 2000);
        }
        // else if (email == '') {
        //     this.setState({
        //         isEmailValid: false,
        //         emailLabel: 'Email can\'t be empty',
        //         emailBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Email can\'t be empty', 2000);
        // } else if (password == '') {
        //     this.setState({
        //         isPasswordValid: false,
        //         passwordLabel: 'Password can\'t be empty',
        //         passwordBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Password can\'t be empty', 2000);
        // } else if (!this._validateEmail(email)) {
        //     this.setState({
        //         isEmailValid: false,
        //         emailLabel: 'Invalid Email id',
        //         emailBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Invalid Email id', 2000);
        // } else if (!this._validatePassord(password)) {
        //     this.setState({
        //         isPasswordValid: false,
        //         passwordLabel: 'Password length is less than 8 characters',
        //         passwordBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
        // }
        else {
            try {
                this.setState({
                    loading: true
                })
                axios.post(api.profile_edu,
                    {
                        school: school,
                        degree: degree,
                        study: study,
                        from: fromYear,
                        to: toYear
                    }, config)
                    .then(async (response) => {
                        this.setState({
                            loading: false,
                            school: '',
                            degree: '',
                            study: '',
                            fromYear: '',
                            toYear: '',
                            ModalVisibleStatus: false,
                        })
                        await this._getEdu();
                        console.log(response);
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
                        this.setState({ loading: false })
                    });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    _editEdu = async (school, degree, study, fromYear, toYear) => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        Keyboard.dismiss();

        if (school == '' && degree == '' && study == '' && fromYear == '' && toYear == '') {
            this.setState({
                isSchoolValid: false,
                isDegreeValid: false,
                isStudyValid: false,
                isFromYearValid: false,
                isToYearValid: false,

                schoolLabel: "School / College / University can't be empty",
                degreeLabel: "Degree can't be empty",
                studyLabel: "Field of Study can't be empty",
                fromYearLabel: "From Year can't be empty",
                toYearLabel: "To Year can't be empty",

                schoolBorderColor: colours.skilent_danger,
                degreeBorderColor: colours.skilent_danger,
                studyBorderColor: colours.skilent_danger,
                fromYearBorderColor: colours.skilent_danger,
                toYearBorderColor: colours.skilent_danger
            })
            this.refs.customToast.showToast('All fields can\'t be empty', 2000);
        }
        // else if (email == '') {
        //     this.setState({
        //         isEmailValid: false,
        //         emailLabel: 'Email can\'t be empty',
        //         emailBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Email can\'t be empty', 2000);
        // } else if (password == '') {
        //     this.setState({
        //         isPasswordValid: false,
        //         passwordLabel: 'Password can\'t be empty',
        //         passwordBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Password can\'t be empty', 2000);
        // } else if (!this._validateEmail(email)) {
        //     this.setState({
        //         isEmailValid: false,
        //         emailLabel: 'Invalid Email id',
        //         emailBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Invalid Email id', 2000);
        // } else if (!this._validatePassord(password)) {
        //     this.setState({
        //         isPasswordValid: false,
        //         passwordLabel: 'Password length is less than 8 characters',
        //         passwordBorderColor: colours.skilent_danger,
        //     })
        //     this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
        // }
        else {
            try {
                this.setState({
                    updateLoading: true
                })
                axios.put(api.profile_edu + "/" + this.state.edu_id,
                    {
                        school: school,
                        degree: degree,
                        study: study,
                        from: fromYear,
                        to: toYear
                    }, config)
                    .then(async (response) => {
                        this.setState({
                            updateLoading: false,
                            school: '',
                            degree: '',
                            study: '',
                            fromYear: '',
                            toYear: '',
                            edu_id: null,
                            editModalVisibleStatus: false,
                        })
                        await this._getEdu();
                        console.log(response);
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
                        this.setState({ loading: false })
                    });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    _deleteEdu = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        Keyboard.dismiss();

        try {
            this.setState({
                deleteLoading: true
            })
            axios.delete(api.profile_edu + "/" + this.state.edu_id, config)
                .then(async (response) => {
                    this.setState({
                        deleteLoading: false,
                        school: '',
                        degree: '',
                        study: '',
                        fromYear: '',
                        toYear: '',
                        edu_id: null,
                        editModalVisibleStatus: false,
                    })
                    await this._getEdu();
                })
                .catch((error) => {
                    console.warn(error.response.data);
                }).finally(() => {
                    this.setState({ loading: false })
                });
        }
        catch (error) {
            console.error(error);
        }

    }

    _eduItem = (item) => {
        const year_from = item.from + " - ";
        const year_to = item.to == null ? "Present" : item.to;
        const year = year_from + year_to;

        return (
            <EducationCard
                school={item.school}
                degree={item.degree}
                field={item.study}
                year={year}
                onPressEdit={() => { this.ShowEditModalFunction(!this.state.editModalVisibleStatus); this._setEditValues(item); }} />
        )
    }

    ShowModalFunction = (visible) => {
        this.setState({
            ModalVisibleStatus: visible,
            school: '',
            degree: '',
            study: '',
            fromYear: '',
            toYear: '',
        });
    }

    ShowEditModalFunction = (visible) => {
        this.setState({
            editModalVisibleStatus: visible,
            school: '',
            degree: '',
            study: '',
            fromYear: '',
            toYear: '',
        });
    }

    _setEditValues = (item) => {
        var from = item.from?.toString() || '';
        var to = item.to?.toString() || '';

        this.setState({
            school: item.school,
            degree: item.degree,
            study: item.study,
            fromYear: from,
            toYear: to,
            edu_id: item.id
        });
    }

    addModal = () => {
        return (
            <Modal
                onNavigate={this.onNavigate}
                transparent={true}
                animationType={'fade'}
                visible={this.state.ModalVisibleStatus}
                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus); }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInsideView}>
                        <Heading_2 text="Add Education" colour={colours.skilent_textPrimary} />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus)} style={{ position: 'absolute', right: dimensions.skilent_margin, top: dimensions.skilent_margin }}>
                            <Icon type="IonIcon" name={"close"} size={dimensions.screenHeight / 30} color={colours.skilent_textPrimary} />
                        </TouchableOpacity>
                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.schoolLabelText
                                        }
                                    ]
                                }
                                text="School / College / University"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                label="School / College / University"
                                placeholder="School / College / University"
                                returnKeyType="next"
                                onSubmitEditing={() => this.degree.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.school}
                                ref={input => this.school = input}
                                onChangeText={school => this.setState({ school: school, isSchoolValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.schoolPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        schoolBorderColor: colours.skilent_primary,
                                        schoolPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        schoolLabelText: "600",
                                        schoolTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        schoolBorderColor: colours.skilent_textSecondary,
                                        schoolPlaceHolderColor: null,
                                        schoolLabelText: null,
                                        schoolTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.schoolTextColour,
                                    borderColor: this.state.schoolBorderColor
                                }}
                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.degreeLabelText
                                        }
                                    ]
                                }
                                text="Degree"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Degree"
                                returnKeyType='next'
                                onSubmitEditing={() => this.study.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.degree}
                                ref={input => this.degree = input}
                                onChangeText={degree => this.setState({ degree: degree, isDegreeValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.degreePlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        degreeBorderColor: colours.skilent_primary,
                                        degreePlaceHolderColor: colours.skilent_textPlaceHolder,
                                        degreeLabelText: "600",
                                        degreeTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        degreeBorderColor: colours.skilent_textSecondary,
                                        degreePlaceHolderColor: null,
                                        degreeLabelText: null,
                                        degreeTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.degreeTextColour,
                                    borderColor: this.state.degreeBorderColor
                                }}

                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.studyLabelText
                                        }
                                    ]
                                }
                                text="Field of Study"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Field of Study"
                                returnKeyType='next'
                                onSubmitEditing={() => this.fromYear.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.study}
                                ref={input => this.study = input}
                                onChangeText={study => this.setState({ study: study, isStudyValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.studyPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        studyBorderColor: colours.skilent_primary,
                                        studyPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        studyLabelText: "600",
                                        studyTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        studyBorderColor: colours.skilent_textSecondary,
                                        studyPlaceHolderColor: null,
                                        studyLabelText: null,
                                        studyTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.studyTextColour,
                                    borderColor: this.state.studyBorderColor
                                }}

                            />
                        </>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1 }}>
                                <Body_2
                                    style={
                                        [
                                            styles.label,
                                            {
                                                fontWeight: this.state.fromYearLabelText
                                            }
                                        ]
                                    }
                                    text="From"
                                    colour={colours.skilent_textPrimary} />

                                <TextInput
                                    placeholder="Year"
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.toYear.focus()}

                                    autoCorrect={false}
                                    clearButtonMode='while-editing'
                                    maxLength={4}
                                    keyboardType='number-pad'

                                    value={this.state.fromYear}
                                    ref={input => this.fromYear = input}
                                    onChangeText={fromYear => this.setState({ fromYear: fromYear, isFromYearValid: true })}
                                    blurOnSubmit={false}
                                    placeholderTextColor={this.state.fromYearPlaceHolderColor}

                                    onFocus={() => {
                                        this.setState({
                                            fromYearBorderColor: colours.skilent_primary,
                                            fromYearPlaceHolderColor: colours.skilent_textPlaceHolder,
                                            fromYearLabelText: "600",
                                            fromYearTextColour: colours.skilent_primary
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            fromYearBorderColor: colours.skilent_textSecondary,
                                            fromYearPlaceHolderColor: null,
                                            fromYearLabelText: null,
                                            fromYearTextColour: colours.skilent_textPrimary
                                        })
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        height: dimensions.screenHeight / 16,
                                        borderRadius: dimensions.screenHeight / 200,
                                        paddingLeft: dimensions.skilent_padding,
                                        fontFamily: 'SFProDisplay-Medium',
                                        fontSize: dimensions.screenHeight / 45,
                                        color: this.state.fromYearTextColour,
                                        borderColor: this.state.fromYearBorderColor,
                                        marginRight: dimensions.skilent_half_margin
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body_2
                                    style={
                                        {
                                            fontWeight: this.state.toYearLabelText,
                                            marginBottom: dimensions.skilent_half_margin / 2,
                                            marginTop: dimensions.skilent_half_margin,
                                            marginLeft: dimensions.skilent_half_margin
                                        }
                                    }
                                    text="To"
                                    colour={colours.skilent_textPrimary} />

                                <TextInput
                                    placeholder="Year"
                                    returnKeyType='go'
                                    onSubmitEditing={() => this._addEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)}

                                    autoCorrect={false}
                                    clearButtonMode='while-editing'
                                    maxLength={4}
                                    keyboardType='number-pad'

                                    value={this.state.toYear}
                                    ref={input => this.toYear = input}
                                    onChangeText={toYear => this.setState({ toYear: toYear, isToYearValid: true })}
                                    blurOnSubmit={false}
                                    placeholderTextColor={this.state.toYearPlaceHolderColor}

                                    onFocus={() => {
                                        this.setState({
                                            toYearBorderColor: colours.skilent_primary,
                                            toYearPlaceHolderColor: colours.skilent_textPlaceHolder,
                                            toYearLabelText: "600",
                                            toYearTextColour: colours.skilent_primary
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            toYearBorderColor: colours.skilent_textSecondary,
                                            toYearPlaceHolderColor: null,
                                            toYearLabelText: null,
                                            toYearTextColour: colours.skilent_textPrimary
                                        })
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        height: dimensions.screenHeight / 16,
                                        borderRadius: dimensions.screenHeight / 200,
                                        paddingLeft: dimensions.skilent_padding,
                                        fontFamily: 'SFProDisplay-Medium',
                                        fontSize: dimensions.screenHeight / 45,
                                        color: this.state.toYearTextColour,
                                        borderColor: this.state.toYearBorderColor,
                                        marginLeft: dimensions.skilent_half_margin
                                    }}
                                />
                            </View>
                        </View>

                        <Button style={{ height: dimensions.screenHeight / 20 }} onPress={() => this._addEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)}
                            title={
                                this.state.loading ? <ActivityIndicator size="small" color="#fff" /> : 'ADD EDUCATION'
                            } />
                    </View>
                </View>
            </Modal>
        )
    }

    editModal = () => {
        return (
            <Modal
                onNavigate={this.onNavigate}
                transparent={true}
                animationType={'fade'}
                visible={this.state.editModalVisibleStatus}
                onRequestClose={() => { this.ShowEditModalFunction(!this.state.editModalVisibleStatus); }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInsideView}>
                        <Heading_2 text="Edit Education" colour={colours.skilent_textPrimary} />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.ShowEditModalFunction(!this.state.editModalVisibleStatus)} style={{ position: 'absolute', right: dimensions.skilent_margin, top: dimensions.skilent_margin }}>
                            <Icon type="IonIcon" name={"close"} size={dimensions.screenHeight / 30} color={colours.skilent_textPrimary} />
                        </TouchableOpacity>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.schoolLabelText
                                        }
                                    ]
                                }
                                text="School / College / University"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                label="School / College / University"
                                placeholder="School / College / University"
                                returnKeyType="next"
                                onSubmitEditing={() => this.degree.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.school}
                                ref={input => this.school = input}
                                onChangeText={school => this.setState({ school: school, isSchoolValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.schoolPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        schoolBorderColor: colours.skilent_primary,
                                        schoolPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        schoolLabelText: "600",
                                        schoolTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        schoolBorderColor: colours.skilent_textSecondary,
                                        schoolPlaceHolderColor: null,
                                        schoolLabelText: null,
                                        schoolTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.schoolTextColour,
                                    borderColor: this.state.schoolBorderColor
                                }}
                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.degreeLabelText
                                        }
                                    ]
                                }
                                text="Degree"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Degree"
                                returnKeyType='next'
                                onSubmitEditing={() => this.study.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.degree}
                                ref={input => this.degree = input}
                                onChangeText={degree => this.setState({ degree: degree, isDegreeValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.degreePlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        degreeBorderColor: colours.skilent_primary,
                                        degreePlaceHolderColor: colours.skilent_textPlaceHolder,
                                        degreeLabelText: "600",
                                        degreeTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        degreeBorderColor: colours.skilent_textSecondary,
                                        degreePlaceHolderColor: null,
                                        degreeLabelText: null,
                                        degreeTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.degreeTextColour,
                                    borderColor: this.state.degreeBorderColor
                                }}

                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.studyLabelText
                                        }
                                    ]
                                }
                                text="Field of Study"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Field of Study"
                                returnKeyType='next'
                                onSubmitEditing={() => this.fromYear.focus()}

                                autoCapitalize='words'
                                autoCorrect={false}
                                clearButtonMode='while-editing'
                                maxLength={50}
                                keyboardType='default'

                                value={this.state.study}
                                ref={input => this.study = input}
                                onChangeText={study => this.setState({ study: study, isStudyValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.studyPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        studyBorderColor: colours.skilent_primary,
                                        studyPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        studyLabelText: "600",
                                        studyTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        studyBorderColor: colours.skilent_textSecondary,
                                        studyPlaceHolderColor: null,
                                        studyLabelText: null,
                                        studyTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.studyTextColour,
                                    borderColor: this.state.studyBorderColor
                                }}

                            />
                        </>

                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1 }}>
                                <Body_2
                                    style={
                                        [
                                            styles.label,
                                            {
                                                fontWeight: this.state.fromYearLabelText
                                            }
                                        ]
                                    }
                                    text="From"
                                    colour={colours.skilent_textPrimary} />

                                <TextInput
                                    placeholder="Year"
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.toYear.focus()}

                                    autoCorrect={false}
                                    clearButtonMode='while-editing'
                                    maxLength={4}
                                    keyboardType='number-pad'

                                    value={this.state.fromYear}
                                    ref={input => this.fromYear = input}
                                    onChangeText={fromYear => this.setState({ fromYear: fromYear, isFromYearValid: true })}
                                    blurOnSubmit={false}
                                    placeholderTextColor={this.state.fromYearPlaceHolderColor}

                                    onFocus={() => {
                                        this.setState({
                                            fromYearBorderColor: colours.skilent_primary,
                                            fromYearPlaceHolderColor: colours.skilent_textPlaceHolder,
                                            fromYearLabelText: "600",
                                            fromYearTextColour: colours.skilent_primary
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            fromYearBorderColor: colours.skilent_textSecondary,
                                            fromYearPlaceHolderColor: null,
                                            fromYearLabelText: null,
                                            fromYearTextColour: colours.skilent_textPrimary
                                        })
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        height: dimensions.screenHeight / 16,
                                        borderRadius: dimensions.screenHeight / 200,
                                        paddingLeft: dimensions.skilent_padding,
                                        fontFamily: 'SFProDisplay-Medium',
                                        fontSize: dimensions.screenHeight / 45,
                                        color: this.state.fromYearTextColour,
                                        borderColor: this.state.fromYearBorderColor,
                                        marginRight: dimensions.skilent_half_margin
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body_2
                                    style={
                                        {
                                            fontWeight: this.state.toYearLabelText,
                                            marginBottom: dimensions.skilent_half_margin / 2,
                                            marginTop: dimensions.skilent_half_margin,
                                            marginLeft: dimensions.skilent_half_margin
                                        }
                                    }
                                    text="To"
                                    colour={colours.skilent_textPrimary} />

                                <TextInput
                                    placeholder="Year"
                                    returnKeyType='go'
                                    onSubmitEditing={() => this._addEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)}

                                    autoCorrect={false}
                                    clearButtonMode='while-editing'
                                    maxLength={4}
                                    keyboardType='number-pad'

                                    value={this.state.toYear}
                                    ref={input => this.toYear = input}
                                    onChangeText={toYear => this.setState({ toYear: toYear, isToYearValid: true })}
                                    blurOnSubmit={false}
                                    placeholderTextColor={this.state.toYearPlaceHolderColor}

                                    onFocus={() => {
                                        this.setState({
                                            toYearBorderColor: colours.skilent_primary,
                                            toYearPlaceHolderColor: colours.skilent_textPlaceHolder,
                                            toYearLabelText: "600",
                                            toYearTextColour: colours.skilent_primary
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            toYearBorderColor: colours.skilent_textSecondary,
                                            toYearPlaceHolderColor: null,
                                            toYearLabelText: null,
                                            toYearTextColour: colours.skilent_textPrimary
                                        })
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        height: dimensions.screenHeight / 16,
                                        borderRadius: dimensions.screenHeight / 200,
                                        paddingLeft: dimensions.skilent_padding,
                                        fontFamily: 'SFProDisplay-Medium',
                                        fontSize: dimensions.screenHeight / 45,
                                        color: this.state.toYearTextColour,
                                        borderColor: this.state.toYearBorderColor,
                                        marginLeft: dimensions.skilent_half_margin
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            {/* <Button style={{ height: dimensions.screenHeight / 20 }} onPress={() => this._addEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)} title={'UPDATE'} />
                            <Button style={{ height: di((mensions.screenHeight / 20 }} onPress={() => this._addEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)} title={'UPDATE'} /> */}
                            <TouchableOpacity onPress={() => { this._deleteEdu() }} activeOpacity={0.5}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: dimensions.skilent_margin,
                                    marginBottom: dimensions.skilent_margin,
                                    backgroundColor: colours.skilent_danger,
                                    height: dimensions.screenHeight / 16,
                                    width: dimensions.screenWidth / 2 - (dimensions.skilent_margin * 2.5),
                                    borderRadius: dimensions.screenWidth,
                                    marginRight: dimensions.skilent_margin

                                }}>
                                    {this.state.deleteLoading ? <ActivityIndicator size="small" color="#fff" /> : <Subtitle text={"DELETE"} colour={colours.skilent_white} />}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this._editEdu(this.state.school, this.state.degree, this.state.study, this.state.fromYear, this.state.toYear)} activeOpacity={0.5}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: dimensions.skilent_margin,
                                    marginBottom: dimensions.skilent_margin,
                                    backgroundColor: colours.skilent_primary,
                                    height: dimensions.screenHeight / 16,
                                    width: dimensions.screenWidth / 2 - (dimensions.skilent_margin * 2.5),
                                    borderRadius: 50
                                }}>
                                    {this.state.updateLoading ? <ActivityIndicator size="small" color="#fff" /> : <Subtitle text={"UPDATE"} colour={colours.skilent_white} />}
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <>
                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                    {this.addModal()}
                    {this.editModal()}
                    <Header
                        text="Education Details"
                        colour={colours.skilent_textPrimary}
                        arrow
                        rightIcon
                        rightIconColour={colours.skilent_primary}
                        rightIconName={"ios-add-circle-sharp"}
                        rightIconsize={30}
                        rightIconPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}
                    />

                    <Separator />

                    {
                        this.state.eduData.length == 0
                            ?
                            this.state.loading ?
                                null
                                :
                                <Information infoText={"No Education data" + '\n' + "Click on '+' to add"} />
                            :
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ margin: dimensions.skilent_margin }}>
                                    <FlatList
                                        keyExtractor={(item, index) => item.id.toString()}
                                        data={this.state.eduData}
                                        renderItem={({ item }) => this._eduItem(item)}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        onEndReachedThreshold={1}
                                    />
                                </View>
                            </ScrollView>
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
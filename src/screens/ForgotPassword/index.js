import { ActivityIndicator, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Body_2, Heading_1 } from '../../components/Fonts';
import React, { Component } from 'react';

import Button from '../../components/Button';
import ButtonBottomText from './../../components/ButtonBottomText'
import Logo from "./../../components/Logo";
import Margin from '../../components/Margin';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from './../../components/Toast';
import api from '../../../assets/api';
import axios from 'axios';
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            email: '',
            isEmailValid: true,
            emailLabel: '',

            emailBorderColor: colours.skilent_textSecondary,
            emailPlaceHolderColor: null,
            emailLabelText: null,
            emailTextColour: colours.skilent_textPrimary,
        };
    }

    _validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            return false;
        }
        else {
            return true;
        }
    }

    _forgotPassword = async (email) => {
        Keyboard.dismiss();
        if (email == '') {
            this.setState({
                isEmailValid: false,
                emailLabel: 'Email can\'t be empty',
                emailBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Email can\'t be empty', 2000);
        }
        else if (!this._validateEmail(email)) {
            this.setState({
                isEmailValid: false,
                emailLabel: 'Invalid Email id',
                emailBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Invalid Email id', 2000);
        }
        else {
            try {
                this.setState({
                    loading: true
                })
                axios.post(api.forgot_password,
                    {
                        email: email
                    })
                    .then(async (response) => {
                        if (response.status == 200) {
                            await this.refs.customToast.showToast('Password reset instructions have been sent to your mail', 2000);
                            await setTimeout(async () => {
                                await this.props.navigation.navigate('SignIn');
                            }, 2000);
                        } else {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Something went wrong'
                            })
                        }
                        this.refs.customToast.showToast('Something went wrong', 2000);
                    })
                    .catch((error) => {
                        if (error.response.data.statusCode == 403) {
                            this.setState({
                                isEmailValid: true,
                                emailLabel: 'User not confirmed'
                            })
                            this.refs.customToast.showToast('User not confirmed', 2000);
                        } else if (error.response.data.statusCode == 404) {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'User not found'
                            })
                            this.refs.customToast.showToast('User not found', 2000);
                        } else if (error.response.data.statusCode == 422) {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Validation error'
                            })
                            this.refs.customToast.showToast('Validation error', 2000);
                        } else {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Something went wrong'
                            })
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

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
                    <View style={styles.workingContainer}>
                        <Logo />

                        <Heading_1 colour={colours.skilent_textPrimary} text="Forgot Password" />

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.emailLabelText
                                        }
                                    ]
                                }
                                text="Email"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                label="Email"
                                placeholder="Email"
                                returnKeyType="next"
                                onSubmitEditing={() => this.password.focus()}

                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                clearButtonMode='while-editing'
                                keyboardType='email-address'
                                maxLength={50}

                                value={this.state.email}
                                ref={input => this.email = input}
                                onChangeText={email => this.setState({ email: email, isEmailValid: true })}
                                blurOnSubmit={false}
                                placeholderTextColor={this.state.emailPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        emailBorderColor: colours.skilent_primary,
                                        emailPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        emailLabelText: "600",
                                        emailTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        emailBorderColor: colours.skilent_textSecondary,
                                        emailPlaceHolderColor: null,
                                        emailLabelText: null,
                                        emailTextColour: colours.skilent_textPrimary
                                    })
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: dimensions.screenHeight / 16,
                                    borderRadius: dimensions.screenHeight / 200,
                                    paddingLeft: dimensions.skilent_padding,
                                    fontFamily: 'SFProDisplay-Medium',
                                    fontSize: dimensions.screenHeight / 45,
                                    color: this.state.emailTextColour,
                                    borderColor: this.state.emailBorderColor
                                }}
                            />
                        </>

                        <Button
                            onPress={() => this._forgotPassword(this.state.email.toLowerCase())}
                            title={
                                this.state.loading ? <ActivityIndicator size='small' color="#fff" /> : 'SUBMIT'
                            } />

                        <ButtonBottomText info="Remembered the password! " action="Sign In" onPress={() => this.props.navigation.navigate("SignIn")} />

                    </View>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    },

    workingContainer: {
        margin: dimensions.skilent_margin,
        marginTop: 0
    },

    label: {
        marginBottom: dimensions.skilent_half_margin / 2,
        marginTop: dimensions.skilent_half_margin
    },
});
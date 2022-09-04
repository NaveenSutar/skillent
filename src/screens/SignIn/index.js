import { ActivityIndicator, Alert, Keyboard, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Body_1, Body_2, Heading_1 } from '../../components/Fonts';
import { Logo, LogoHeader } from "./../../components/Logo"
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './../../components/Button'
import ButtonBottomText from './../../components/ButtonBottomText'
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from './../../components/Toast';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            email: '',
            isEmailValid: true,
            emailLabel: '',

            password: '',
            isPasswordValid: true,
            passwordLabel: '',

            secureTextEntry: true,

            emailBorderColor: colours.skilent_textSecondary,
            emailPlaceHolderColor: null,
            emailLabelText: null,
            emailTextColour: colours.skilent_textPrimary,

            passwordBorderColor: colours.skilent_textSecondary,
            passwordPlaceHolderColor: null,
            passwordLabelText: null,
            passwordTextColour: colours.skilent_textPrimary
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

    _validatePassord = (password) => {
        if (password.length < 8) {
            return false;
        }
        else {
            return true;
        }
    }

    _login = async (email, password) => {
        Keyboard.dismiss();
        if (email == '' && password == '') {
            this.setState({
                isEmailValid: false,
                emailLabel: 'Email can\'t be empty',
                isPasswordValid: false,
                passwordLabel: 'Password can\'t be empty',
                emailBorderColor: colours.skilent_danger,
                passwordBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('All fields can\'t be empty', 2000);
        }
        else if (email == '') {
            this.setState({
                isEmailValid: false,
                emailLabel: 'Email can\'t be empty',
                emailBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Email can\'t be empty', 2000);
        } else if (password == '') {
            this.setState({
                isPasswordValid: false,
                passwordLabel: 'Password can\'t be empty',
                passwordBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Password can\'t be empty', 2000);
        } else if (!this._validateEmail(email)) {
            this.setState({
                isEmailValid: false,
                emailLabel: 'Invalid Email id',
                emailBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Invalid Email id', 2000);
        } else if (!this._validatePassord(password)) {
            this.setState({
                isPasswordValid: false,
                passwordLabel: 'Password length is less than 8 characters',
                passwordBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
        }
        else {
            try {
                this.setState({
                    loading: true
                })
                axios.post(api.signin,
                    {
                        email: email,
                        password: password
                    })
                    .then(async (response) => {
                        console.log("Here");
                        if (response.data.data.role == 'candidate') {
                            await AsyncStorage.setItem('skilent_tokan', response.headers.jwt);
                            await AsyncStorage.setItem('loginTime', new Date().toString());
                            this.email.clear()
                            this.password.clear()
                            this.props.navigation.navigate('Tab');

                        }
                        else {
                            Alert.alert(
                                "Warning!\n",
                                "Only Candidates can login",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data);

                        if (error.response.data.statusCode == 401) {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Unauthorized',

                                isPasswordValid: true,
                                passwordLabel: ''
                            })
                            this.refs.customToast.showToast('Unauthorized', 2000);
                        } else if (error.response.data.statusCode == 403) {
                            if (error.response.data.message == "Wrong password") {
                                this.setState({
                                    isPasswordValid: false,
                                    passwordLabel: 'Wrong Password',

                                    isEmailValid: true,
                                    emailLabel: '',
                                })
                                this.refs.customToast.showToast('Wrong Password', 2000);
                            } else if (error.response.data.message == "Account not confirmed") {
                                this.refs.customToast.showToast('Account not verified, please verify from your email', 2000);
                            } else {
                                this.refs.customToast.showToast('Something went wrong', 2000);
                            }
                            this.refs.customToast.showToast('Wrong Password', 2000);
                        } else if (error.response.data.statusCode == 404) {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'User not found',

                                isPasswordValid: true,
                                passwordLabel: ''
                            })
                            this.refs.customToast.showToast('User not found', 2000);
                        } else if (error.response.data.statusCode == 422) {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Validation error',

                                isPasswordValid: true,
                                passwordLabel: ''
                            })
                            this.refs.customToast.showToast('Validation error', 2000);
                        } else {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Something went wrong',

                                isPasswordValid: true,
                                passwordLabel: ''
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
                        <ScrollView>
                            <LogoHeader title={"Sign Up"} onPress={() => this.props.navigation.navigate("SignUp")}/>

                            <Heading_1 text="Sign In" colour={colours.skilent_textPrimary} />

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

                            <>
                                <Body_2
                                    style={
                                        [
                                            styles.label,
                                            {
                                                fontWeight: this.state.passwordLabelText
                                            }
                                        ]
                                    }
                                    text="Password"
                                    colour={colours.skilent_textPrimary} />

                                <TextInput
                                    placeholder="Password"
                                    returnKeyType='go'
                                    onSubmitEditing={() => this._login(this.state.email.toLowerCase(), this.state.password)}

                                    autoCapitalize='none'
                                    autoCorrect={false}

                                    maxLength={30}
                                    secureTextEntry={true}

                                    value={this.state.password}
                                    ref={input => this.password = input}
                                    onChangeText={password => this.setState({ password: password, isPasswordValid: true })}
                                    blurOnSubmit={false}

                                    placeholderTextColor={this.state.passwordPlaceHolderColor}

                                    onFocus={() => {
                                        this.setState({
                                            passwordBorderColor: colours.skilent_primary,
                                            passwordPlaceHolderColor: colours.skilent_textPlaceHolder,
                                            passwordLabelText: "600",
                                            passwordTextColour: colours.skilent_primary
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({
                                            passwordBorderColor: colours.skilent_textSecondary,
                                            passwordPlaceHolderColor: null,
                                            passwordLabelText: null,
                                            passwordTextColour: colours.skilent_textPrimary
                                        })
                                    }}
                                    style={
                                        {
                                            borderWidth: 1,
                                            height: dimensions.screenHeight / 16,
                                            borderRadius: dimensions.screenHeight / 200,
                                            paddingLeft: dimensions.skilent_padding,
                                            fontFamily: 'SFProDisplay-Medium',
                                            fontSize: dimensions.screenHeight / 45,
                                            color: this.state.passwordTextColour,
                                            borderColor: this.state.passwordBorderColor
                                        }
                                    }

                                />
                            </>

                            <Body_1 onPress={() => this.props.navigation.navigate('ForgotPassword')} style={styles.forgotPassword} text="Forgot Password" colour={colours.skilent_primary} />
                            <Button onPress={() => this._login(this.state.email.toLowerCase(), this.state.password)}
                                title={
                                    this.state.loading ? <ActivityIndicator size="small" color="#fff" /> : 'SIGN IN'
                                } />
                                
                            <ButtonBottomText info="Search Jobs as guest? " action="Click Here" onPress={() => this.props.navigation.navigate("GuestJobs")} />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1
    },

    workingContainer: {
        margin: dimensions.skilent_margin,
        marginTop: 0,
        flex: 1
    },

    forgotPassword: {
        marginTop: dimensions.screenHeight / 160,
        textDecorationLine: 'underline'
    },

    label: {
        marginBottom: dimensions.skilent_half_margin / 2,
        marginTop: dimensions.skilent_half_margin
    }
});
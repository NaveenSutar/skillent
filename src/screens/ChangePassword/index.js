import { ActivityIndicator, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Body_1, Body_2 } from '../../components/Fonts';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import Separator from '../../components/Separator';
import Toast from './../../components/Toast';
import api from '../../../assets/api';
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            current_password: '',
            new_password: '',
            confirm_password: '',

            currentPasswordBorderColor: colours.skilent_textSecondary,
            currentPasswordPlaceHolderColor: null,
            currentPasswordLabelText: null,
            currentPasswordTextColour: colours.skilent_textPrimary,

            newPasswordBorderColor: colours.skilent_textSecondary,
            newPasswordPlaceHolderColor: null,
            newPasswordLabelText: null,
            newPasswordTextColour: colours.skilent_textPrimary,

            confirmPasswordBorderColor: colours.skilent_textSecondary,
            confirmPasswordPlaceHolderColor: null,
            confirmPasswordLabelText: null,
            confirmPasswordTextColour: colours.skilent_textPrimary,
        };
    }

    _validatePassord = (password) => {
        if (password.length < 8) {
            return false;
        }
        else {
            return true;
        }
    }

    _change_password = async (current_password, new_password, confirm_password) => {
        if (current_password == '' && new_password == '' && confirm_password == '') {
            this.setState({
                currentPasswordBorderColor: colours.skilent_danger,
                newPasswordBorderColor: colours.skilent_danger,
                confirmPasswordBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('All fields can\'t be empty', 2000);
        }
        else if (!this._validatePassord(current_password)) {
            this.setState({
                currentPasswordBorderColor: colours.skilent_danger,
                newPasswordBorderColor: colours.skilent_textSecondary,
                confirmPasswordBorderColor: colours.skilent_textSecondary,
            })
            this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
        }
        else if (!this._validatePassord(new_password)) {
            this.setState({
                currentPasswordBorderColor: colours.skilent_textSecondary,
                newPasswordBorderColor: colours.skilent_danger,
                confirmPasswordBorderColor: colours.skilent_textSecondary,
            })
            this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
        }
        else if (new_password != confirm_password) {
            this.setState({
                currentPasswordBorderColor: colours.skilent_textSecondary,
                newPasswordBorderColor: colours.skilent_danger,
                confirmPasswordBorderColor: colours.skilent_danger,
            })
            this.refs.customToast.showToast('Password doesn\'t match', 2000);
        }
        else {
            const config = {
                headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
            };
            try {
                this.setState({
                    loading: true
                })
                axios.patch(api.profile_password_update,
                    {
                        oldPassword: current_password,
                        newPassword: new_password,
                        confirmPassword: confirm_password
                    },
                    config)
                    .then(async (response) => {
                        console.log(response);
                        if (response.status == 204) {
                            await this.refs.customToast.showToast('Password changed!, Signin with new password', 2000);
                            await AsyncStorage.removeItem('skilent_tokan');
                            await setTimeout(async () => {
                                await this.props.navigation.navigate('SignIn');
                            }, 2000);
                        } else {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Something went wrong'
                            })
                            this.refs.customToast.showToast('Something went wrong', 2000);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
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
                                emailLabel: 'Wrong Password'
                            })
                            this.refs.customToast.showToast('Wrong Password', 2000);
                        } else {
                            this.setState({
                                isEmailValid: false,
                                emailLabel: 'Something went wrong'
                            })
                            this.refs.customToast.showToast('Something went wrong', 2000);
                            console.log(error);
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
                    <Header text="Change Password" colour={colours.skilent_textPrimary} arrow />

                    <Separator />

                    <View style={styles.workingContainer}>
                        <Body_1 colour={colours.skilent_textSecondary} text="This lets you to change the password of your profile onto the platform" />

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.currentPasswordLabelText
                                        }
                                    ]
                                }
                                text="Current Password"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Current Password"
                                returnKeyType='next'
                                onSubmitEditing={() => this.new_password.focus()}

                                autoCapitalize='none'
                                autoCorrect={false}

                                maxLength={30}
                                secureTextEntry={true}

                                value={this.state.current_password}
                                ref={input => this.current_password = input}
                                onChangeText={current_password => this.setState({ current_password: current_password })}
                                blurOnSubmit={false}

                                placeholderTextColor={this.state.currentPasswordPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        currentPasswordBorderColor: colours.skilent_primary,
                                        currentPasswordPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        currentPasswordLabelText: "600",
                                        currentPasswordTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        currentPasswordBorderColor: colours.skilent_textSecondary,
                                        currentPasswordPlaceHolderColor: null,
                                        currentPasswordLabelText: null,
                                        currentPasswordTextColour: colours.skilent_textPrimary
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
                                        color: this.state.currentPasswordTextColour,
                                        borderColor: this.state.currentPasswordBorderColor
                                    }
                                }

                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.newPasswordLabelText
                                        }
                                    ]
                                }
                                text="New Password"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="New Password"
                                returnKeyType='next'
                                onSubmitEditing={() => this.confirm_password.focus()}

                                autoCapitalize='none'
                                autoCorrect={false}

                                maxLength={30}
                                secureTextEntry={true}

                                value={this.state.new_password}
                                ref={input => this.new_password = input}
                                onChangeText={new_password => this.setState({ new_password: new_password })}
                                blurOnSubmit={false}

                                placeholderTextColor={this.state.newPasswordPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        newPasswordBorderColor: colours.skilent_primary,
                                        newPasswordPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        newPasswordLabelText: "600",
                                        newPasswordTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        newPasswordBorderColor: colours.skilent_textSecondary,
                                        newPasswordPlaceHolderColor: null,
                                        newPasswordLabelText: null,
                                        newPasswordTextColour: colours.skilent_textPrimary
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
                                        color: this.state.newPasswordTextColour,
                                        borderColor: this.state.newPasswordBorderColor
                                    }
                                }

                            />
                        </>

                        <>
                            <Body_2
                                style={
                                    [
                                        styles.label,
                                        {
                                            fontWeight: this.state.confirmPasswordLabelText
                                        }
                                    ]
                                }
                                text="Confirm Password"
                                colour={colours.skilent_textPrimary} />

                            <TextInput
                                placeholder="Confirm Password"
                                returnKeyType='go'
                                onSubmitEditing={() => this._change_password(this.state.current_password, this.state.new_password, this.state.confirm_password)}

                                autoCapitalize='none'
                                autoCorrect={false}

                                maxLength={30}
                                secureTextEntry={true}

                                value={this.state.confirm_password}
                                ref={input => this.confirm_password = input}
                                onChangeText={confirm_password => this.setState({ confirm_password: confirm_password })}
                                blurOnSubmit={false}

                                placeholderTextColor={this.state.confirmPasswordPlaceHolderColor}

                                onFocus={() => {
                                    this.setState({
                                        confirmPasswordBorderColor: colours.skilent_primary,
                                        confirmPasswordPlaceHolderColor: colours.skilent_textPlaceHolder,
                                        confirmPasswordLabelText: "600",
                                        confirmPasswordTextColour: colours.skilent_primary
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        confirmPasswordBorderColor: colours.skilent_textSecondary,
                                        confirmPasswordPlaceHolderColor: null,
                                        confirmPasswordLabelText: null,
                                        confirmPasswordTextColour: colours.skilent_textPrimary
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
                                        color: this.state.confirmPasswordTextColour,
                                        borderColor: this.state.confirmPasswordBorderColor
                                    }
                                }

                            />
                        </>

                        <Button
                            onPress={() => this._change_password(this.state.current_password, this.state.new_password, this.state.confirm_password)}
                            title={
                                this.state.loading ? <ActivityIndicator size='small' color="#fff" /> : 'CHANGE PASSWORD'
                            } />
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
        flex: 1,
        margin: dimensions.skilent_margin
    },

    label: {
        marginBottom: dimensions.skilent_half_margin / 2,
        marginTop: dimensions.skilent_half_margin
    }
});
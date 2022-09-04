import { ActivityIndicator, Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Body_1, Body_2, Heading_1 } from '../../components/Fonts';
import { Logo, LogoHeader } from "./../../components/Logo"
import React, { Component } from 'react';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from '../../components/Button';
import ButtonBottomText from './../../components/ButtonBottomText'
import SearchBar from '../../components/SearchBar';
import Toast from './../../components/Toast';
import api from '../../../assets/api';
import axios from 'axios';
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,

			fname: '',
			lname: '',
			email: '',
			password: '',
			repeatPassword: '',
			termsNConditions: false,

			fnameBorderColor: colours.skilent_textSecondary,
			fnamePlaceHolderColor: null,
			fnameLabelText: null,
			fnameTextColour: colours.skilent_textPrimary,

			lnameBorderColor: colours.skilent_textSecondary,
			lnamePlaceHolderColor: null,
			lnameLabelText: null,
			lnameTextColour: colours.skilent_textPrimary,

			emailBorderColor: colours.skilent_textSecondary,
			emailPlaceHolderColor: null,
			emailLabelText: null,
			emailTextColour: colours.skilent_textPrimary,

			passwordBorderColor: colours.skilent_textSecondary,
			passwordPlaceHolderColor: null,
			passwordLabelText: null,
			passwordTextColour: colours.skilent_textPrimary,

			repeatPasswordBorderColor: colours.skilent_textSecondary,
			repeatPasswordPlaceHolderColor: null,
			repeatPasswordLabelText: null,
			repeatPasswordTextColour: colours.skilent_textPrimary,
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

	_signup = async (fname, lname, email, password, confirmPassword, termsNConditions) => {
		Keyboard.dismiss();
		if (fname == '' && lname == '' && email == '' && password == '' && confirmPassword == '') {
			this.setState({
				fnameBorderColor: colours.skilent_danger,
				lnameBorderColor: colours.skilent_danger,
				emailBorderColor: colours.skilent_danger,
				passwordBorderColor: colours.skilent_danger,
				repeatPasswordBorderColor: colours.skilent_danger,
			})
			Alert.alert(
				"Warning!\n",
				"All fields are mandatory",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			);
		} else if (fname == '') {
			this.setState({
				fnameBorderColor: colours.skilent_danger
			})
			this.refs.customToast.showToast('Firstname can\'t be empty', 2000);
		} else if (lname == '') {
			this.setState({
				lnameBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Lastname can\'t be empty', 2000);
		} else if (email == '') {
			this.setState({
				emailBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Email can\'t be empty', 2000);
		} else if (!this._validateEmail(email)) {
			this.setState({
				emailBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Invalid Email id', 2000);
		} else if (password == '') {
			this.setState({
				passwordBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Password can\'t be empty', 2000);
		} else if (confirmPassword == '') {
			this.setState({
				repeatPasswordBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Repeat Password can\'t be empty', 2000);
		} else if (termsNConditions == false) {
			Alert.alert(
				"Warning!\n",
				"Please accept Terms and Conditions to signup",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			);
		} else if (!this._validatePassord(password)) {
			this.setState({
				passwordBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Password length is less than 8 characters', 2000);
		} else if (password != confirmPassword) {
			this.setState({
				passwordBorderColor: colours.skilent_danger,
				repeatPasswordBorderColor: colours.skilent_danger,
			})
			this.refs.customToast.showToast('Password doesn\'t match', 2000);
		} else {
			try {
				this.setState({
					loading: true
				})
				axios.post(api.signup,
					{
						firstName: fname,
						lastName: lname,
						email: email,
						password: password,
						confirmationPassword: confirmPassword
					})
					.then(async (response) => {
						if (response.status == 200) {
							await this.refs.customToast.showToast('Account created successfully!', 1000);
							await setTimeout(async () => {
								await this.props.navigation.navigate('SignIn');
							}, 1000);

						} else {
							Alert.alert(
								"Warning!\n",
								"Something went wrong",
								[
									{ text: "OK", onPress: () => console.log("OK Pressed") }
								]
							);
						}
					})
					.catch((error) => {
						console.error(error.response.data);
						if (error.response.data.statusCode == 400) {
							this.setState({
								emailLabel: 'User Already Exists',
							})
							this.refs.customToast.showToast('User Already Exists', 2000);
						} else if (error.response.data.statusCode == 403) {
							this.setState({
								emailLabel: 'Invalid Email',
							})
							this.refs.customToast.showToast('Invalid Email', 2000);
						}
					}).finally(() => {
						this.setState({ loading: false })

						this.setState({
							fnameLabel: '',
							lnameLabel: '',
							emailLabel: '',
							passwordLabel: '',
							repeatPasswordBorderColor: '',
							termsNConditions: false,
						})

						this.fname.clear();
						this.lname.clear();
						this.email.clear();
						this.password.clear();
						this.repeatPassword.clear();
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
				<ScrollView style={{ backgroundColor: colours.skilent_white }}>
					<SafeAreaView style={styles.container}>
						<Toast ref="customToast" backgroundColor={colours.skilent_toast} position="top" />
						<View style={styles.workingContainer}>

							{/* <Logo /> */}
                            <LogoHeader title={"Sign In"} onPress={() => this.props.navigation.navigate("SignIn")}/>


							<Heading_1 colour={colours.skilent_textPrimary} text="Sign Up" />

							<>
								<Body_2
									style={
										[
											styles.label,
											{
												fontWeight: this.state.fnameLabelText
											}
										]
									}
									text="Firstname"
									colour={colours.skilent_textPrimary} />

								<TextInput
									placeholder="Firstname"
									returnKeyType="next"
									onSubmitEditing={() => this.lname.focus()}

									autoCapitalize='words'
									autoCorrect={false}
									autoCompleteType='name'
									clearButtonMode='while-editing'
									keyboardType='default'
									maxLength={50}

									value={this.state.fname}
									ref={input => this.fname = input}
									onChangeText={fname => this.setState({ fname: fname })}
									blurOnSubmit={false}
									placeholderTextColor={this.state.fnamePlaceHolderColor}

									onFocus={() => {
										this.setState({
											fnameBorderColor: colours.skilent_primary,
											fnamePlaceHolderColor: colours.skilent_textPlaceHolder,
											fnameLabelText: "600",
											fnameTextColour: colours.skilent_primary
										})
									}}
									onBlur={() => {
										this.setState({
											fnameBorderColor: colours.skilent_textSecondary,
											fnamePlaceHolderColor: null,
											fnameLabelText: null,
											fnameTextColour: colours.skilent_textPrimary
										})
									}}
									style={{
										borderWidth: 1,
										height: dimensions.screenHeight / 16,
										borderRadius: dimensions.screenHeight / 200,
										paddingLeft: dimensions.skilent_padding,
										fontFamily: 'SFProDisplay-Medium',
										fontSize: dimensions.screenHeight / 45,
										color: this.state.fnameTextColour,
										borderColor: this.state.fnameBorderColor
									}}
								/>
							</>

							<>
								<Body_2
									style={
										[
											styles.label,
											{
												fontWeight: this.state.lnameLabelText
											}
										]
									}
									text="Lastname"
									colour={colours.skilent_textPrimary} />

								<TextInput
									placeholder="Lastname"
									returnKeyType="next"
									onSubmitEditing={() => this.email.focus()}

									autoCapitalize='words'
									autoCorrect={false}
									autoCompleteType='name'
									clearButtonMode='while-editing'
									keyboardType='default'
									maxLength={50}

									value={this.state.lname}
									ref={input => this.lname = input}
									onChangeText={lname => this.setState({ lname: lname })}
									blurOnSubmit={false}
									placeholderTextColor={this.state.lnamePlaceHolderColor}

									onFocus={() => {
										this.setState({
											lnameBorderColor: colours.skilent_primary,
											lnamePlaceHolderColor: colours.skilent_textPlaceHolder,
											lnameLabelText: "600",
											lnameTextColour: colours.skilent_primary
										})
									}}
									onBlur={() => {
										this.setState({
											lnameBorderColor: colours.skilent_textSecondary,
											lnamePlaceHolderColor: null,
											lnameLabelText: null,
											lnameTextColour: colours.skilent_textPrimary
										})
									}}
									style={{
										borderWidth: 1,
										height: dimensions.screenHeight / 16,
										borderRadius: dimensions.screenHeight / 200,
										paddingLeft: dimensions.skilent_padding,
										fontFamily: 'SFProDisplay-Medium',
										fontSize: dimensions.screenHeight / 45,
										color: this.state.lnameTextColour,
										borderColor: this.state.lnameBorderColor
									}}
								/>
							</>

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
									onChangeText={email => this.setState({ email: email })}
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
									returnKeyType='next'
									onSubmitEditing={() => this.repeatPassword.focus()}

									autoCapitalize='none'
									autoCorrect={false}

									maxLength={30}
									secureTextEntry={true}

									value={this.state.password}
									ref={input => this.password = input}
									onChangeText={password => this.setState({ password: password })}
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

							<>
								<Body_2
									style={
										[
											styles.label,
											{
												fontWeight: this.state.repeatPasswordLabelText
											}
										]
									}
									text="Repeat Password"
									colour={colours.skilent_textPrimary} />

								<TextInput
									placeholder="Repeat Password"
									returnKeyType='go'
									onSubmitEditing={() => this._signup(this.state.fname, this.state.lname, this.state.email, this.state.password, this.state.repeatPassword, this.state.termsNConditions)}

									autoCapitalize='none'
									autoCorrect={false}

									maxLength={30}
									secureTextEntry={true}

									value={this.state.repeatPassword}
									ref={input => this.repeatPassword = input}
									onChangeText={repeatPassword => this.setState({ repeatPassword: repeatPassword })}
									blurOnSubmit={false}

									placeholderTextColor={this.state.repeatPasswordPlaceHolderColor}

									onFocus={() => {
										this.setState({
											repeatPasswordBorderColor: colours.skilent_primary,
											repeatPasswordPlaceHolderColor: colours.skilent_textPlaceHolder,
											repeatPasswordLabelText: "600",
											repeatPasswordTextColour: colours.skilent_primary
										})
									}}
									onBlur={() => {
										this.setState({
											repeatPasswordBorderColor: colours.skilent_textSecondary,
											repeatPasswordPlaceHolderColor: null,
											repeatPasswordLabelText: null,
											repeatPasswordTextColour: colours.skilent_textPrimary
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
											color: this.state.repeatPasswordTextColour,
											borderColor: this.state.repeatPasswordBorderColor
										}
									}

								/>
							</>

							<View style={styles.termsContainer}>
								<BouncyCheckbox
									size={dimensions.screenHeight / 45}
									fillColor={colours.skilent_textSecondary}
									unfillColor="#FFFFFF"
									iconStyle={{
										borderColor: colours.skilent_textSecondary,
										borderRadius: dimensions.screenHeight / 150
									}}
									disableText={true}
									isChecked={this.state.termsNConditions}
									onPress={() => {
										this.setState({
											termsNConditions: !this.state.termsNConditions
										})
									}}
									disableBuiltInState={false}
								/>
								<Body_1 style={styles.termsBlack} text="I accept " colour={colours.skilent_textSecondary} />
								<Body_1 onPress={() => this.props.navigation.navigate("Terms")} style={styles.termsLink} text="Terms and Conditions" colour={colours.skilent_primary} />
							</View>

							<Button
								onPress={() => this._signup(this.state.fname, this.state.lname, this.state.email, this.state.password, this.state.repeatPassword, this.state.termsNConditions)}
								title={
									this.state.loading ? <ActivityIndicator size='small' color="#fff" /> : 'SIGN UP'
								} />

                            <ButtonBottomText info="Search Jobs as guest? " action="Click Here" onPress={() => this.props.navigation.navigate("GuestJobs")} />

						</View>
					</SafeAreaView>
				</ScrollView>
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

	termsContainer: {
		marginTop: dimensions.screenHeight / 160,
		flexDirection: 'row',
		alignItems: 'center',
		height: dimensions.screenHeight / 30
	},

	termsBlack: {
		marginLeft: dimensions.skilent_half_margin
	},

	termsLink: {
		textDecorationLine: 'underline',
	},
});
import { Body_1, Body_2, Heading_2 } from '../../components/Fonts';
import { FlatList, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Information from '../../components/Information';
import Loader from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import WorkExperienceCard from '../../components/WorkExperienceCard';
import api from '../../../assets/api'
import axios from 'axios';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class WorkExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            expData: [],
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            modalVisibleStatus: false,
            editModalVisiblaeStatus: false
        };
    }

    componentDidMount = () => {
        this._getexp();
    }

    _getexp = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('skilent_tokan') }
        };

        try {
            this.setState({
                loading: false
            })
            axios.get(api.profile_exp, config)
                .then((response) => {
                    this.setState({
                        expData: response.data.data,
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

    _editExp = () => {
        console.log('Edit')
    }

    _expItem = (item) => {
        const year_from = this.state.month[item.fromMonth - 1] + " " + item.fromYear + " - ";
        const year_to = item.toYear == null ? "Present" : this.state.month[item.toMonth - 1] + " " + item.toYear;
        const year = year_from + year_to;

        return (
            <WorkExperienceCard
                onPress={() => { this._editExp() }}
                title={item.title}
                org={item.company}
                location={item.location}
                year={year}
                onPressEdit={() => { this._editExp() }} />
        )
    }

    ShowModalFunction = (visible) => {
        this.setState({ modalVisibleStatus: visible });
    }

    render() {
        const { modalVisibleStatus } = this.state;
        return (
            <>

                <Loader loading={this.state.loading} />
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                    <Modal
                        onNavigate={this.onNavigate}
                        transparent={true}
                        animationType={'fade'}
                        visible={modalVisibleStatus}
                        onRequestClose={() => { this.ShowModalFunction(!modalVisibleStatus); }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalInsideView}>
                                <Heading_2 text="Add Work Experience" colour={colours.skilent_textPrimary} />
                                <TouchableOpacity activeOpacity={0.5} onPress={() => this.ShowModalFunction(!this.state.modalVisibleStatus)} style={{ position: 'absolute', right: dimensions.skilent_margin, top: dimensions.skilent_margin }}>
                                    <Icon type="IonIcon" name={"close"} size={dimensions.screenHeight / 30} color={colours.skilent_danger} />
                                </TouchableOpacity>
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
                                            height: dimensions.screenHeight / 20,
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
                                                height: dimensions.screenHeight / 20,
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
                                                height: dimensions.screenHeight / 20,
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

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flex: 1 }}>
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
                                                height: dimensions.screenHeight / 20,
                                                borderRadius: dimensions.screenHeight / 200,
                                                paddingLeft: dimensions.skilent_padding,
                                                paddingRight: dimensions.skilent_half_padding,
                                                fontFamily: 'SFProDisplay-Medium',
                                                fontSize: dimensions.screenHeight / 45,
                                                color: this.state.fnameTextColour,
                                                borderColor: this.state.fnameBorderColor,
                                                marginRight: dimensions.skilent_half_margin

                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Body_2
                                            style={
                                                {
                                                    fontWeight: this.state.fnameLabelText,
                                                    marginBottom: dimensions.skilent_half_margin / 2,
                                                    marginTop: dimensions.skilent_half_margin,
                                                    marginLeft: dimensions.skilent_half_margin
                                                }
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
                                                height: dimensions.screenHeight / 20,
                                                borderRadius: dimensions.screenHeight / 200,
                                                paddingLeft: dimensions.skilent_padding,
                                                fontFamily: 'SFProDisplay-Medium',
                                                fontSize: dimensions.screenHeight / 45,
                                                color: this.state.fnameTextColour,
                                                borderColor: this.state.fnameBorderColor,
                                                marginLeft: dimensions.skilent_half_margin
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flex: 1 }}>
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
                                                height: dimensions.screenHeight / 20,
                                                borderRadius: dimensions.screenHeight / 200,
                                                paddingLeft: dimensions.skilent_padding,
                                                paddingRight: dimensions.skilent_half_padding,
                                                fontFamily: 'SFProDisplay-Medium',
                                                fontSize: dimensions.screenHeight / 45,
                                                color: this.state.fnameTextColour,
                                                borderColor: this.state.fnameBorderColor,
                                                marginRight: dimensions.skilent_half_margin

                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Body_2
                                            style={
                                                {
                                                    fontWeight: this.state.fnameLabelText,
                                                    marginBottom: dimensions.skilent_half_margin / 2,
                                                    marginTop: dimensions.skilent_half_margin,
                                                    marginLeft: dimensions.skilent_half_margin
                                                }
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
                                                height: dimensions.screenHeight / 20,
                                                borderRadius: dimensions.screenHeight / 200,
                                                paddingLeft: dimensions.skilent_padding,
                                                fontFamily: 'SFProDisplay-Medium',
                                                fontSize: dimensions.screenHeight / 45,
                                                color: this.state.fnameTextColour,
                                                borderColor: this.state.fnameBorderColor,
                                                marginLeft: dimensions.skilent_half_margin
                                            }}
                                        />
                                    </View>
                                </View>

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
                                    <Body_1 style={styles.termsBlack} text="Currently Working " colour={colours.skilent_textSecondary} />
                                </View>

                                <Button style={{ height: dimensions.screenHeight / 20 }} onPress={() => { this.ShowModalFunction(!this.state.modalVisibleStatus); }} title={'ADD EXPERIENCE'} />


                            </View>
                        </View>
                    </Modal>

                    <Header
                        text="Work Experience Details"
                        colour={colours.skilent_textPrimary}
                        arrow

                        rightIcon
                        rightIconColour={colours.skilent_primary}
                        rightIconName={"ios-add-circle-sharp"}
                        rightIconsize={30}
                        rightIconPress={() => { this.ShowModalFunction(!modalVisibleStatus) }}
                    />

                    <Separator />

                    {
                        this.state.expData.length == 0
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
                                        data={this.state.expData}
                                        renderItem={({ item }) => this._expItem(item)}
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
        flex: 1
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

    termsContainer: {
        marginTop: dimensions.skilent_half_margin,
        marginBottom: -dimensions.skilent_half_margin,
        flexDirection: 'row',
        alignItems: 'center',
        height: dimensions.screenHeight / 30
    },

    termsBlack: {
        marginLeft: dimensions.skilent_half_margin
    },
});
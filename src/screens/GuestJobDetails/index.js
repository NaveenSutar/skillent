import { Body_1, Heading_3 } from '../../components/Fonts';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header';
import JobDetailElement from '../../components/JobDetailElement';
import Margin from '../../components/Margin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../../components/Separator';
import TwoButton from '../../components/TwoButton';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

export default class GuestJobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobDetail: this.props.route.params.jobDetail
        };
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { jobDetail } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    text="Description"
                    colour={colours.skilent_textPrimary}
                    arrow
                    arrowOnpress={()=>this.props.navigation.goBack()}
                />

                <Separator />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ margin: dimensions.skilent_margin }}>
                        <JobDetailElement
                            title={jobDetail.title}
                            text1={jobDetail.employmentType.map((d, i, arr) => <Text>{this.Capitalize(d).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                            text2={jobDetail.spheres.map((d, i, arr) => <Text>{this.Capitalize(d.name).replace(/_/g, ' ')}{i != (arr.length - 1) ? ',' : ''} </Text>)}
                            text3={"$" + jobDetail.rateFrom + (jobDetail.rateTo == null ? "" : " - $" + jobDetail.rateTo) +  "/Hourly, "}
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

                <TwoButton
                    btn1Title={"APPLY"}
                    btn2Title={"SHARE"} btn1Onpress={() => this.props.navigation.reset({
                        index: 1,
                        routes: [{ name: 'SignIn' }],
                    })}
                    btn2Onpress={() => this.props.navigation.reset({
                        index: 1,
                        routes: [{ name: 'SignIn' }],
                    })}
                    btn1BGColour={colours.skilent_primary}
                    />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    }
});
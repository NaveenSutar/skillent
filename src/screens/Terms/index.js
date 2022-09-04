import { Body_1, Body_2, Heading_1, Heading_2, Heading_3, Subtitle } from '../../components/Fonts';
//import liraries
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Margin from '../../components/Margin';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../components/Separator';
import colours from '../../../assets/colours'
import dimensions from '../../../assets/dimensions';

// create a component
class Terms extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header text="Terms and Conditions" colour={colours.skilent_textPrimary} />
                <Separator />
                <View style={styles.workingContainer}>
                    {/* <Heading_3 style={styles.headingText} text="Terms and Conditions" colour={colours.skilent_textPrimary} /> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Margin margin={1} />

                        <Heading_2 colour={colours.skilent_primary} text="Welcome to Skilent" />

                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="These terms and conditions outline the rules and regulations for the use of Skilent's Website." />

                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Skilent's website if you do not accept all of the terms and conditions stated on this page." />

                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: 'Client', 'You' and 'Your' refers to you, the person accessing this website and accepting the Company's terms and conditions. 'The Company', 'Ourselves', 'We', 'Our' and 'Us', refers to our Company. 'Party', 'Parties', or 'Us', refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services/products, in accordance with and subject to, prevailing law of . Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same." />

                        <Margin margin={2} />

                        <Heading_3 text="Cookies" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="We employ the use of cookies. By using Skilent's website you consent to the use of cookies in accordance with Skilent's privacy policy." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies." />

                        <Margin margin={2} />

                        <Heading_3 text="License" />

                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Unless otherwise stated, Skilent and/or it's licensors own the intellectual property rights for all material on Skilent. All intellectual property rights are reserved. You may view and/or print pages from https://www.skilent.com/ for your own personal use subject to restrictions set in these terms and conditions." />
                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="You must not:" />

                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="1. Republish material from https://www.skilent.com/" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="2. Sell, rent or sub-license material from https://www.skilent.com/" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="3. Reproduce, duplicate or copy material from https://www.skilent.com/" />
                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Redistribute content from Skilent (unless content is specifically made for redistribution)." />

                        <Margin margin={2} />

                        <Heading_3 text="Hyperlinking to our Content" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="1. The following organizations may link to our Web site without prior written approval:" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="1. Government agencies;" />
                        <Margin margin={1} />

                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="2. Search engines;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="3. News organizations;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="4. Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="5. Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="2. These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="3. We may consider and approve in our sole discretion other link requests from the following types of organizations:" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="1. commonly-known consumer and/or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="2. dot.com community sites;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="3. associations or other groups representing charities, including charity giving sites," />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="4. online directory distributors;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="5. internet portals;" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="6. accounting, law and consulting firms whose primary clients are businesses; and" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="7. educational institutions and trade associations." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="We will approve link requests from these organizations if we determine that: (a) the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link); (b) the organization does not have an unsatisfactory record with us; (c) the benefit to us from the visibility associated with the hyperlink outweighs the absence of " />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and (c) fits within the context of the linking party's site." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e-mail to support@skilent.com. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Approved organizations may hyperlink to our Web site as follows:" />

                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="1. By use of our corporate name; or" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="2. By use of the uniform resource locator (Web address) being linked to; or" />
                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="3. By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party's site." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="No use of Skilent's logo or other artwork will be allowed for linking absent a trademark license agreement." />

                        <Margin margin={2} />

                        <Heading_3 text="Iframes" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site." />

                        <Margin margin={2} />

                        <Heading_3 text="Reservation of Rights" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions." />

                        <Margin margin={2} />

                        <Heading_3 text="Removal of links from our website" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date." />

                        <Margin margin={2} />

                        <Heading_3 text="Content Liability" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights." />

                        <Margin margin={2} />

                        <Heading_3 text="Disclaimer" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:" />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="1. limit or exclude our or your liability for death or personal injury resulting from negligence;" />

                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="2. limit or exclude our or your liability for fraud or fraudulent misrepresentation;" />

                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="3. limit any of our or your liabilities in any way that is not permitted under applicable law; or" />

                        <Margin margin={1} />
                        <Body_1 colour={colours.skilent_textPrimary} style={styles.indent} text="4. exclude any of our or your liabilities that may not be excluded under applicable law." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty." />

                        <Margin margin={1} />


                        <Body_1 colour={colours.skilent_textPrimary} style={styles.justify} text="To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature." />

                        <Button title="I Understand" onPress={() => this.props.navigation.navigate('SignUp')} />
                    </ScrollView >


                </View>
            </SafeAreaView >
        );
    }
}

// define your styles
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

    headingText: {
        marginTop: dimensions.skilent_margin,
        marginBottom: dimensions.skilent_margin
    },

    justify: {
        textAlign: 'justify'
    },

    indent: {
        marginLeft: 8
    }
});

export default Terms;

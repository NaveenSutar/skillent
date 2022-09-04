import DetailElement from '../DetailElement';
import { Heading_2 } from '../Fonts';
import Margin from './../Margin';
//import liraries
import React from 'react';
import { StyleSheet } from 'react-native';
import colours from '../../../assets/colours';

// create a component
const JobDetailElement = ({ title, text1, text2, text3, text4, text5, text6, text7 }) => {
    return (
        <>
            <Heading_2 text={title} colour={colours.skilent_textPrimary} />
            <Margin margin={1} />
            {text1.length != 0 && <DetailElement detailText={text1} icon="briefcase" />}
            {text2.length != 0 && <DetailElement detailText={text2} icon="pie-chart" />}
            {text3 && <DetailElement detailText={text3} color={colours.skilent_success} icon="wallet" />}
            {text4 && <DetailElement detailText={text4} color={colours.skilent_success} icon="calendar" />}
            {text5.length != 0 && <DetailElement detailText={text5} icon="information-circle" />}
            {text6.length != 0 && <DetailElement detailText={text6} icon="color-filter" />}
            <DetailElement detailText={text7} icon="location" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default JobDetailElement;
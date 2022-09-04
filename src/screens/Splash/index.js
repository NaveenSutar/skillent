import { Animated, StyleSheet } from 'react-native';
import React, { Component, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from './../../components/Logo'
import colours from './../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
    }, []);

    return (
        <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
            {props.children}
        </Animated.View>
    );
};

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        await AsyncStorage.setItem('onboard', '1'); //Remove this line to enable onboarding of the app

        setTimeout(async () => {
            if (await AsyncStorage.getItem('onboard') == '1' && await AsyncStorage.getItem('skilent_tokan') != null) {
                this.props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'Tab' }],
                });
            }
            else if (await AsyncStorage.getItem('onboard') == '1' && await AsyncStorage.getItem('skilent_tokan') == null) {
                this.props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'GuestJobs' }]
                });
            }
            else {
                this.props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'Onboard' }],
                });
            }
        }, 1000);
    }

    render() {
        return (
            <FadeInView style={styles.container}>
                <Logo />
            </FadeInView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        width: dimensions.screenWidth,
        height: dimensions.screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
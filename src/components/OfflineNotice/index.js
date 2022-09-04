import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Body_1 } from '../Fonts';
import NetInfo from "@react-native-community/netinfo";
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Body_1 text="No Internet Connection" colour={colours.skilent_white} />
        </View>
    );
}

class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.handleConnectivityChange(state.isConnected)
        });
    }

    componentWillUnmount() {
        NetInfo.addEventListener(state => {
            this.handleConnectivityChange(state.isConnected)
        });
    }

    handleConnectivityChange = (isConnected) => {
        this.setState({ isConnected });
    };

    render() {
        if (this.state.isConnected == false) {
            return (
                    <MiniOfflineSign />
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: colours.skilent_danger,
        height: dimensions.screenHeight / 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.screenWidth,
        position: 'absolute',
        bottom: 0,
        zIndex: 10
    },

    offlineText: {
        color: '#fff'

    }
});

export default OfflineNotice;
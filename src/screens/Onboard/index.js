import { Body_1, Subtitle } from '../../components/Fonts';
import { Image, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import Forward from '../../components/Forward';
import Icon from '../../components/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../components/SearchBar';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class Onboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Image style={styles.banner} source={require('../../../assets/images/3.jpg')} />
        <View style={styles.onBoardText}>
          <Subtitle style={styles.onBoardTitle} text="Earn points by referring others" />
          <Body_1 colour={colours.skilent_textSecondary} style={styles.onBoardSub} text='Referring applicants earns you points.You will receive 50 points if the candidate is chosen.' />
        </View>

        <Icon type="EntypoIcon" name="dots-three-horizontal" style={styles.progress} size={dimensions.screenHeight / 25} color={colours.skilent_primary} />

        <Forward style={{ flex: 1, }} onPress={() => this.props.navigation.reset({ routes: [{ name: 'GuestJobs' }] })} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.skilent_white,
    flex: 1,
    alignItems: 'center'
  },

  banner: {
    width: dimensions.screenWidth,
    resizeMode: 'contain',
    flex: 6,
  },

  onBoardText: {
    margin: dimensions.skilent_margin,
    alignItems: 'center',
    flex: 2,
  },

  onBoardTitle: {
    marginBottom: dimensions.skilent_half_margin,
    textAlign: 'center',
  },

  onBoardSub: {

    textAlign: 'center'
  },

  progress: {
    flex: 5,
  }
});
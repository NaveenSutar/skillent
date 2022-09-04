import { Animated, StyleSheet, Text, View } from 'react-native';
import { Body_1, Body_2, Subtitle } from '../Fonts';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

class Toast extends Component {
  constructor() {
    super();

    this.animateTranslate = new Animated.Value(-10);

    this.animateOpacity = new Animated.Value(0);

    this.state = { renderToast: false }

    this.isShownToast = false;

    this.message = '';
  }

  componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID);
  }

  showToast(message = "Custom Toast...", duration = 3000) {
    if (this.isShownToast === false) {
      this.message = message;

      this.isShownToast = true;

      this.setState({ renderToast: true }, () => {
        Animated.parallel([
          Animated.timing(
            this.animateTranslate,
            {
              toValue: 0,
              duration: 350
            }
          ),

          Animated.timing(
            this.animateOpacity,
            {
              toValue: 1,
              duration: 350
            }
          )
        ]).start(this.hideToast(duration))
      });
    }
  }

  hideToast = (duration) => {
    this.timerID = setTimeout(() => {
      Animated.parallel([
        Animated.timing(
          this.animateTranslate,
          {
            toValue: 10,
            duration: 350
          }
        ),

        Animated.timing(
          this.animateOpacity,
          {
            toValue: 0,
            duration: 350
          }
        )
      ]).start(() => {
        this.setState({ renderToast: false });
        this.animateTranslate.setValue(-10);
        this.isShownToast = false;
        clearTimeout(this.timerID);
      })
    }, duration);
  }

  render() {
    const { position, backgroundColor, orientation } = this.props;

    if (this.state.renderToast) {
      return (
        <Animated.View style={[
          styles.animatedToastViewContainer,
          {
            top: (position === 'top') ? '5%' : '90%',
            transform: [orientation === "xAxis" ? {
              translateY: this.animateTranslate
            } : {
              translateX: this.animateTranslate
            }],
            opacity: this.animateOpacity
          }]}
          pointerEvents='none'
        >
          <View
            style={[
              styles.animatedToastView,

              { backgroundColor }
            ]}
          >

            <Body_1 numberOfLines={2} text={this.message} colour={colours.skilent_white} style={styles.toastText} />
          </View>
        </Animated.View>
      );
    }
    else {
      return null;
    }
  }
}

Toast.propTypes = {
  backgroundColor: PropTypes.string,
  position: PropTypes.oneOf([
    'top',
    'bottom'
  ]),
  textColor: PropTypes.string,
  orientation: PropTypes.string
};

Toast.defaultProps = {
  backgroundColor: '#666666',
  textColor: 'white',
  orientation: 'xAxis'
}

const styles = StyleSheet.create({
  animatedToastViewContainer: {
    width: '100%',
    zIndex: 9999,
    position: 'absolute'
  },

  animatedToastView: {
    width: dimensions.screenWidth - dimensions.skilent_margin * 2,
    paddingVertical: dimensions.skilent_half_padding,
    paddingHorizontal: dimensions.skilent_half_padding,
    borderRadius: dimensions.skilent_half_padding,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  toastText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

module.exports = Toast;
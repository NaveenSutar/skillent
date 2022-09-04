import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Body_2 } from '../Fonts';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borderColor: colours.skilent_textSecondary,
            placeHolderColor: null,
            labelText: null,
            textColour: colours.skilent_textPrimary
        };
    }

    onBlur = () => {
        this.setState({
            borderColor: colours.skilent_textSecondary,
            placeHolderColor: null,
            labelText: null,
            textColour: colours.skilent_textPrimary
        })
    }

    onFocus = () => {
        this.setState({
            borderColor: colours.skilent_primary,
            placeHolderColor: colours.skilent_textPlaceHolder,
            labelText: "600",
            textColour: colours.skilent_primary
        })
    }

    render() {
        return (
            <>
                <Body_2
                    style={
                        [
                            styles.label,
                            {
                                fontWeight: this.state.labelText
                            }
                        ]
                    }
                    text={this.props.label} colour={colours.skilent_textPrimary} />

                <TextInput
                    {...this.props}
                    ref={this.ref}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    placeholderTextColor={this.state.placeHolderColor}
                    style={
                        [
                            styles.textInputs,
                            {
                                color: this.state.textColour,
                                borderColor: this.state.borderColor
                            }
                        ]
                    }

                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        marginBottom: dimensions.skilent_half_margin / 2,
        marginTop: dimensions.skilent_half_margin
    },

    textInputs: {
        borderWidth: 1,
        height: dimensions.screenHeight / 16,
        borderRadius: dimensions.screenHeight / 200,
        paddingLeft: dimensions.skilent_padding,
        fontFamily: 'SFProDisplay-Medium',
        fontSize: dimensions.screenHeight / 45
    }
});

export default InputText;
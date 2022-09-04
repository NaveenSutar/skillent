import { FromChat, ToChat } from '../../components/ChatCard';
import React, { Component } from 'react';

import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../../components/Separator';
import { StyleSheet } from 'react-native';
import colours from '../../../assets/colours';

export default class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Header
                    text="John Rides"
                    colour={colours.skilent_textPrimary}
                    arrow
                    avtImage={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}}
                    rightIcon
                    rightIconColour={colours.skilent_textPrimary}
                    rightIconName="ellipsis-vertical"
                    rightIconsize={40}
                />

                <Separator />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FromChat
                        fromImage={{ uri:"https://robohash.org/590ccae1c485582c4a37e1a547134b2d?set=set2&bgset=bg2&size=400x400"}}
                        fromName="John Rides"
                        fromMessage="Hi Navin"
                        fromTime="2.45 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage='Hi John, How are you?'
                        toTime="2.46 PM" />

                    <FromChat
                        fromImage={{ uri:"https://robohash.org/590ccae1c485582c4a37e1a547134b2d?set=set2&bgset=bg2&size=400x400"}}
                        fromName="John Rides"
                        fromMessage="I'm good, how about you?"
                        fromTime="2.50 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage="i'm good too"
                        toTime="2.51 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage="Need one info from your end. Wanted to ask that when will my interview be scheduled?"
                        toTime="2.51 PM" />

                    <FromChat
                        fromImage={{ uri:"https://robohash.org/590ccae1c485582c4a37e1a547134b2d?set=set2&bgset=bg2&size=400x400"}}
                        fromName="John Rides"
                        fromMessage="Hi Navin"
                        fromTime="2.45 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage='Hi John, How are you?'
                        toTime="2.46 PM" />

                    <FromChat
                        fromImage={{ uri:"https://robohash.org/590ccae1c485582c4a37e1a547134b2d?set=set2&bgset=bg2&size=400x400"}}
                        fromName="John Rides"
                        fromMessage="I'm good, how about you?"
                        fromTime="2.50 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage="i'm good too"
                        toTime="2.51 PM" />

                    <ToChat
                        toImage={{ uri:"https://robohash.org/1a4630150831fce1d8bb9072d6f6c51b?set=set2&bgset=bg2&size=400x400"}}
                        toName="Navin Sutar"
                        toMessage="Need one info from your end. Wanted to ask that when will my interview be scheduled?"
                        toTime="2.51 PM" />

                </ScrollView>
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
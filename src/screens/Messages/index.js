import React, { Component } from 'react';

import Header from '../../components/Header';
import Information from '../../components/Information';
import MessageCard from './../../components/MessageCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import { StyleSheet } from 'react-native';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

SearchBar

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Header text="Messages" colour={colours.skilent_textPrimary} />

                <SearchBar />

                <Information infoText="You don't have any messages"/>

                {/* <ScrollView showsVerticalScrollIndicator={false}>
                    <MessageCard
                        onPress={() => this.props.navigation.navigate('Chats')}
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Kim Hye Yoon"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Laura Scheitzel"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />

                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Tony Marks"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Angela Swan"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Park Kyung Soo"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="John Rides"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Lia Nore"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />


                    <MessageCard
                        recent_msg="Hi how are you?"
                        recent_msg_time="2:45 AM"
                        name="Gunter Scoo"
                        image={{ uri: "https://robohash.org/1c886301c4853adc0be465a818b92d54?set=set3&bgset=bg1&size=200x200"}} />

                </ScrollView> */}



            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    },

    workingContainer: {
        flex: 1,
        marginLeft: dimensions.skilent_margin,
    }
});
import { Animated, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect } from 'react';

import Header from '../../components/Header';
import JobCard from '../../components/JobCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../../components/Separator';
import colours from '../../../assets/colours';
import dimensions from '../../../assets/dimensions';

const ASPECT_RATIO = dimensions.screenWidth / dimensions.screenHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CARD_WIDTH = dimensions.screenWidth * 0.85;
const SPACING_FOR_CARD_INSET = dimensions.screenWidth * 0.1 - dimensions.skilent_margin;

const MapsView = ({ navigation, route }) => {
    const initialMapState = {
        markers: route.params.jobsData,
        region: {
            latitude: route.params.jobsData[0].coordinate.latitude,
            longitude: route.params.jobsData[0].coordinate.longitude,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };

    const [mapState, setMapState] = React.useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= mapState.markers.length) {
                index = mapState.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = mapState.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: mapState.region.latitudeDelta,
                            longitudeDelta: mapState.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = mapState.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Header
                text="Map View"
                colour={colours.skilent_textPrimary}
                arrow={true}
                arrowOnpress={() => { navigation.goBack() }}
            />

            <Separator />

            <MapView
                ref={_map}
                initialRegion={mapState.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {mapState.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <MapView.Marker key={index} 
                        coordinate={marker.coordinate} 
                        onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('./../../../assets/images/pin.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>


            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >

            </ScrollView>

            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {mapState.markers.map((item, index) => (
                    <View style={styles.card} key={index}>
                        <JobCard
                            onPress={() => navigation.navigate('JobDetails', { jobDetail: item })}
                            org={"ComtechLLC / CISPL"}
                            title={item.title}
                            skills={item.educationRequirement}
                            location={item.city.name + ", " + item.country.name}
                            travel={item.travel}
                            relocation={item.relocation}
                            // saveVisible={true}
                            // isSave={item.isFavorite}
                            // onPressSave={() => { this._saveJob(item.id) }}
                        />
                    </View>
                ))}
            </Animated.ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.skilent_white,
        flex: 1,
    },

    layoutContainer: {
        flex: 1,
        padding: 10
    },

    filterBtn: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    bottomSheetContainer: {
        padding: 10,
        paddingTop: 0
    },

    btnContainer: {
        flexDirection: 'row',
    },

    pinIcon: {
        width: 16,
        height: 16,
    },

    applyButtonStyle: {
        flex: 19,
        height: '100%'
    },

    shareButtonStyle: {
        flex: 1,
        marginStart: 10,
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    chipsIcon: {
        marginRight: 5,
        width: 16,
        height: 16,
    },

    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },

    chipsIcon: {
        marginRight: 5,
    },

    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },

    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: dimensions.skilent_half_margin / 2,
    },

    card: {
        marginHorizontal: dimensions.skilent_half_margin,
        width: CARD_WIDTH
    },

    textContent: {
        flex: 2,
        padding: 10,
    },

    cardDescription: {
        fontSize: 12,
        color: "#444",
    },

    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },

    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },

    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },

    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default MapsView;
import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react/cjs/react.development';

export default function AddressFinder() {
    const [location, setLocation] = useState('');
    const [coordinate, setCoordinate] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    const [restaurants, setRestaurants] = useState([]);

    const getLocation = () => {
        const urlLocation = 'http://www.mapquestapi.com/geocoding/v1/address?key=8uCRvi1Zp2maxmjAkZuQGzQT5cO2LxAJ&location=' + location;

        // fetch(urlRestaurantsNearBy)
        //     .then(response => response.json())
        //     .then(dataResponse => setRestaurants(dataResponse))
        //     .catch(err => console.error(err));

        fetch(urlLocation)
            .then(response => response.json())
            .then(data => setCoordinate({
                latitude: data.results[0].locations[0].latLng.lat,
                longitude: data.results[0].locations[0].latLng.lng,
            }))
            .catch(err => console.error(err));
    }

    const getRestaurants = () => {
        const urlRestaurantsNearBy = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coordinate.latitude + ', ' + coordinate.longitude + '&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCJNpMWJUg7CkkyOSvDfFtb2dsMBEwmno0';

        fetch(urlRestaurantsNearBy)
            .then(response => response.json())
            .then(dataResponse => setRestaurants(dataResponse.results))
            .catch(err => console.error(err));
    }

    const test = () => {
        console.log(coordinate);
        console.log(restaurants);
    }

    return (
        <>
            <StatusBar hidden={true} />
            <MapView
                style={{ flex: 10, height: 400 }}
                region={coordinate}
            >

                {restaurants.map((restaurant, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: restaurant.geometry.location.lat,
                            longitude: restaurant.geometry.location.lng
                        }}
                        title={restaurant.name}
                        description={restaurant.vicinity}
                    />
                ))}
            </MapView>

            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={text => setLocation(text)}
                    textAlign='center'
                />

                <Button
                    style={styles.button}
                    title='SHOW ADDRESS'
                    onPress={getLocation}
                />

                <Button
                    style={styles.button}
                    title='SHOW RESTAURANTS'
                    onPress={getRestaurants}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 20
    },

    button: {
        flex: 1,
        width: '100%',
    },
})
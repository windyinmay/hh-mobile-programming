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

    const getLocation = () => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=8uCRvi1Zp2maxmjAkZuQGzQT5cO2LxAJ&location=' + location;
        fetch(url)
            .then(response => response.json())
            .then(data => setCoordinate({
                latitude: data.results[0].locations[0].latLng.lat,
                longitude: data.results[0].locations[0].latLng.lng,
            }))
            .catch(err => console.error(err))
    }

    const test = () => {
        console.log(location)
        console.log(coordinate)
    }

    return (
        <>
            <StatusBar hidden={true} />
            <MapView
                style={{ flex: 15, height: 400 }}
                region={coordinate}
            >
                <Marker
                    coordinate={{
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude
                    }}
                    title={location}
                />
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
                    title='SHOW'
                    onPress={getLocation}
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
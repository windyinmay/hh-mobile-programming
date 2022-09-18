import React from 'react';
import { LogBox } from 'react-native';
import MyPlacesApp from './components/MyPlacesApp';

export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);

  return (
    <MyPlacesApp />
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyMap from './myplacesapp/MyMap';
import MyPlaces from './myplacesapp/MyPlaces';

export default function MyPlacesApp() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator headerTitleAlign='left'>
                <Stack.Screen name='Places' component={MyPlaces} />
                <Stack.Screen name='Map' component={MyMap} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Header, Input, Button, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native';
import { Alert } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDTpBohlgkGvHUa9l6miIJoAuarQwm2VIs",
    authDomain: "myplaces-1172b.firebaseapp.com",
    databaseURL: "https://myplaces-1172b-default-rtdb.firebaseio.com",
    projectId: "myplaces-1172b",
    storageBucket: "myplaces-1172b.appspot.com",
    messagingSenderId: "641109163303",
    appId: "1:641109163303:web:637d2b8031b52c9b8ffd02"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export default function MyPlaces({ navigation }) {
    const [address, setAddress] = useState('');
    const [places, setPlaces] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val();
            const results = Object.values(data);
            setPlaces(results)
        })
    }, []);

    const renderList = ({ item }) =>
        <ListItem
            topDivider bottomDivider
            onLongPress={() => deleteItem(item.id)}
            onPress={() => navigation.navigate('Map', { address: item.name })}
        >
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='gray' size={30} />
        </ListItem>

    const saveAddress = () => {
        setId(id + 1);
        if (address) {
            firebase.database().ref('/items').push(
                { 'id': id, 'name': address }
            );
            setAddress('');
        } else {
            Alert.alert('Error', 'Type address first');
            setAddress('');
        }
    }

    const deleteItem = id => {
        const item = firebase.database().ref('/items').orderByChild('id').equalTo(id);
        item.on('value', snapshot => {
            const data = snapshot.val();
            const result = Object.keys(data);
            firebase.database().ref('/items').child(result.toString()).remove();
        })

       
    }


    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Header
                leftComponent={{ text: 'My Places', style: styles.header }}
                backgroundColor='white'
                placement='left'
            />

            <Divider style={styles.divider} />

            <Input
                label='PLACEFINDER'
                placeholder='Type in address'
                value={address}
                onChangeText={text => setAddress(text)}
            />

            <Button
                title='SAVE'
                icon={
                    <Icon
                        name='save'
                        size={20}
                        color='white'
                        style={{ marginRight: 10 }}
                    />
                }
                buttonStyle={{ backgroundColor: 'gray' }}
                onPress={saveAddress}
            />

            <Divider style={styles.divider} />

            <FlatList
                style={{ margin: 10 }}
                data={places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderList}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },

    divider: {
        height: 2,
        backgroundColor: 'gray',
        marginBottom: 20
    }

})


import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

export default function MyMap({ route, navigation }) {
    const { address } = route.params;

    const [coordinate, setCoordinate] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    const getLocation = () => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=8uCRvi1Zp2maxmjAkZuQGzQT5cO2LxAJ&location=' + address;
        fetch(url)
            .then(response => response.json())
            .then(data => setCoordinate({
                latitude: data.results[0].locations[0].latLng.lat,
                longitude: data.results[0].locations[0].latLng.lng,
            }))
            .catch(err => console.error(err))
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <Header
                leftComponent={{ text: 'Map', style: styles.header }}
                backgroundColor='white'
                placement='left'
            />
            <MapView
                style={{ flex: 15, height: 400 }}
                region={coordinate}
            >
                <Marker
                    coordinate={{
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude
                    }}
                    title={address}
                />
            </MapView>

            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder={address}
                    textAlign='center'
                    editable={false}
                />

                <Button
                    style={styles.button}
                    title='SHOW'
                    onPress={getLocation}
                />
            </View>
        </View>
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

    header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
})
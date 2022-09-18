import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBja9IlKYRObt1zkCsf1Be3DN3GFcCtkds",
    authDomain: "shoppinglist-69930.firebaseapp.com",
    databaseURL: "https://shoppinglist-69930-default-rtdb.firebaseio.com",
    projectId: "shoppinglist-69930",
    storageBucket: "shoppinglist-69930.appspot.com",
    messagingSenderId: "640555371901",
    appId: "1:640555371901:web:d8189bb58ac111b2251014"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function ShoppingList() {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setItems(prods);
        });
    }, []);

    const saveItem = () => {
        if (amount && product) {
            firebase.database().ref('items/').push(
                { 'product': product, 'amount': amount }
            );
            setProduct('');
            setAmount('');
        } else {
            Alert.alert('Error', 'Type product and amount first');
            setProduct('');
            setAmount('');
        }

    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <View style={styles.inputField} >
                <TextInput style={styles.input} placeholder='Product' value={product} onChangeText={product => setProduct(product)} />
                <TextInput style={styles.input} placeholder='Amount' value={amount} onChangeText={amount => setAmount(amount)} />
                <Button title='SAVE' onPress={saveItem} />
            </View>

            <View style={styles.listField}>
                <Text style={{ fontSize: 23 }}>Shopping list</Text>

                <FlatList
                    style={{ margin: 10 }}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <>
                            <Text style={{ fontSize: 18 }}>
                                {item.product}, {item.amount}
                            </Text>
                        </>
                    }
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    listField: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    input: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        height: 30,
        width: 200
    },
})
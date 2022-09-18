import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//open database
const db = SQLite.openDatabase('shoppingListDB');

export default function ShoppingList() {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS shoppingList (id INTEGER PRIMARY KEY NOT NULL, product text, amount text);');
        }, null, updateList);
    }, []);

    //execute when transaction is completed
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM shoppingList;', [], (_, { rows }) =>
                setItems(rows._array)
            )
        })
    }

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO shoppingList(product, amount) VALUES(?,?)',
                [product, amount]);
        }, null, updateList);

        setProduct('');
        setAmount('');
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM shoppingList WHERE id=?;', [id]);
        }, null, updateList)
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <View style={styles.inputField} >
                <TextInput style={styles.input} placeholder='Product' value={product} onChangeText={text => setProduct(text)} />
                <TextInput style={styles.input} placeholder='Amount' value={amount} onChangeText={text => setAmount(text)} />
                <Button title='SAVE' onPress={saveItem} />
            </View>

            <View style={styles.listField}>
                <Text style={{ fontSize: 23 }}>Shopping list</Text>

                <FlatList
                    style={{ margin: 10 }}
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <>
                            <Text style={{ fontSize: 18 }}>
                                {item.product}, {item.amount}
                                <Text style={{color: 'blue'}} onPress={() => deleteItem(item.id)}>  bought</Text>
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
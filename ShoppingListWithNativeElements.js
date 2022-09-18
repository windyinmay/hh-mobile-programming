import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    const renderList = ({ item }) =>
        <ListItem bottomDivider onLongPress={() => deleteItem(item.id)}>
            <ListItem.Content>
                <ListItem.Title>{item.product}</ListItem.Title>
                <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron name='trash' color='red' size={28} />
        </ListItem>



    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <Header
                centerComponent={{ text: 'SHOPPING LIST', style: { color: 'white', fontSize: 20 } }}
            />

            <Input
                placeholder='Product'
                label='PRODUCT'
                value={product}
                onChangeText={text => setProduct(text)}
            />

            <Input
                placeholder='Amount'
                label='AMOUNT'
                value={amount}
                onChangeText={text => setAmount(text)}
            />

            <Button
                onPress={saveItem}
                title=' SAVE'
                icon={
                    <Icon
                        name='save'
                        size={25}
                        color='white'
                    />
                }
            />

            <FlatList
                style={{ margin: 10 }}
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={renderList}
            />
        </View>
    )
}
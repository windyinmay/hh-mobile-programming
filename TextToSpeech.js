import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';


export default function TextToSpeech() {
    const [text, setText] = useState('');

    const speak = () => {
        Speech.speak(text)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={text => setText(text)}
            />

            <Button
                title='PRESS TO HEAR TEXT'
                onPress={speak}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        borderColor: 'black',
        borderWidth: 2,
        width: 250,
        height: 50
    },
})
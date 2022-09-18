import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useState } from "react";

export default function NumberGuessing() {
  const [num, setNum] = useState("");
  const [mess, setMess] = useState("");
  const [result, setResult] = useState(0);
  const [count, setCount] = useState(1);

  useEffect(() => resetGame(), []);

  const resetGame = () => {
    setResult(Math.floor(Math.random() * 100) + 1);
    setMess("Guess a number between 1-100");
    setCount(1);
    setNum("");
  };
  const makeGuess = () => {
    //Parse to integer because num was String at first
    if (result === parseInt(num)) {
      Alert.alert(`You guessed the number in ${count} guesses`);
      resetGame();
    } else if (result < parseInt(num)) {
      setMess(`Your guess ${num} is too high`);
      setNum("");
    } else {
      setMess(`Your guess ${num} is too low`);
      setNum("");
    }

    setCount((prevCount) => prevCount + 1);
  };

  return (
    <View styles={styles.container}>
      <View>
        <Text style={{ fontSize: 20 }}> {mess} </Text>
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          style={{
            fontSize: 20,
            width: 200,
            borderColor: "gray",
            borderWidth: 5,
            margin: 2,
          }}
          onChangeText={(num) => setNum(num)}
          value={num}
        />
      </View>
      <View>
        <Button color="green" onPress={makeGuess} title=" MAKE GUESS " />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 150,
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
});

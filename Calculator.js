import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useState } from "react";

export default function Calculator() {
  const [result, setResult] = useState(0);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <Text>Result: {result}</Text>
        <TextInput
          keyboardType="numeric"
          style={{ width: 200, borderColor: "gray", borderWidth: 2 }}
          onChangeText={(text) => setNum1(text)}
          value={num1}
        />
        <TextInput
          keyboardType="numeric"
          style={{ width: 200, borderColor: "gray", borderWidth: 2 }}
          onChangeText={(text) => setNum2(text)}
          value={num2}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="pink"
          onPress={() => setResult(parseFloat(num1) + parseFloat(num2))}
          title="+"
        />
        <Button
          onPress={() => setResult(parseFloat(num1) - parseFloat(num2))}
          title="-"
        />
        <Button
          color="red"
          onPress={() => setResult(parseFloat(num1) * parseFloat(num2))}
          title=" x "
        />
        <Button
          color="green"
          onPress={() => setResult(parseFloat(num1) / parseFloat(num2))}
          title=" : "
        />
      </View>
      <StatusBar style="auto" />
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

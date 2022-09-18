import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Text,
} from "react-native";

export default function CalWithHistory() {
  const [result, setResult] = useState(0);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [history, setHistory] = useState([]);
  const calcSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
    setHistory([...history, { key: `${num1} + ${num2} = ${sum}` }]);
  };
  const calcSub = () => {
    const sub = parseFloat(num1) - parseFloat(num2);
    setResult(sub);
    setHistory([...history, { key: `${num1} - ${num2} = ${sub}` }]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}> Result : {result.toFixed(2)}</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            width: 200,
            borderColor: "blue",
            borderWidth: 2,
            backgroundColor: "gray"
          }}
          onChangeText={(num1) => setNum1(num1)}
          value={String(num1)}
        />
        <TextInput
          keyboardType="numeric"
          style={{
            width: 200,
            borderColor: "blue",
            borderWidth: 2,
            backgroundColor: "gray",
          }}
          onChangeText={(num2) => setNum2(num2)}
          value={String(num2)}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={calcSum} color="pink" title="+" />
        <Button onPress={calcSub} color="pink" title="-" />
      </View>
      <View style={styles.listContainer}>
        <Text style={{ fontSize: 18 }}>History</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18 }}>{item.key}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 150,
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  btnContainer: {
    flex: 1,
    width: 150,
    padding: 40,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  listContainer: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
});

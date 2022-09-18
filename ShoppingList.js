import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react/cjs/react.development";

export default function ShoppingList() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const addPressed = () => {
    setList([...list, { key: input }]);
    setInput("");
  };

  const clearPressed = () => {
    setList("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 30 }}>
          LIST WHAT YOU WANT TO BUY TODAY :)
        </Text>
        <TextInput
          style={{ width: 200, borderColor: "gray", borderWidth: 2 }}
          onChangeText={(input) => setInput(input)}
          value={String(input)}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={addPressed} color="green" title="ADD"></Button>
        <Button onPress={clearPressed} color="orange" title="CLEAR"></Button>
      </View>
      <View style={styles.listContainer}>
        <Text style={{ fontSize: 20, color: "blue", marginBottom: 20 }}>
          Shopping List
        </Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 15 }}>{item.key}</Text>
          )}
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
    width: 200,
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

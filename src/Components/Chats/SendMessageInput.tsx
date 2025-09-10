import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SendMessageInput = () => {
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        ref={inputRef}
        onChangeText={setInputMessage}
        value={inputMessage}
        style={styles.input}
        placeholder="Type a message..."
      />
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setInputMessage("")}
      >
        <MaterialIcons name="send" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#b3b3b3ff",
    borderColor: "#555555",
    color: "#000000ff",
    marginHorizontal: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 16,
  },
  inputButton: {
    padding: 10,
    backgroundColor: "#575757ff",
    borderRadius: 12,
    marginHorizontal: 5,
  },
});

export default SendMessageInput;

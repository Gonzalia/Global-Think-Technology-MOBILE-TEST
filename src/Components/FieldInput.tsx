import { StyleSheet, TextInput, View } from "react-native";
import DefaultText from "./DefaultText";

interface FieldInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  customStyles?: object;
  label?: string;
}

const FieldInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  customStyles,
  label,
}: FieldInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <DefaultText>{label}</DefaultText>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, customStyles]}
        placeholderTextColor={"#ffffffaa"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 22,
    marginVertical: 10,
  },
  input: {
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default FieldInput;

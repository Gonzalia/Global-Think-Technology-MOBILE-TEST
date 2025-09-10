import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DefaultText from "./DefaultText";
import Loading from "./Loading";

interface DefaultButtonProps {
  text: string;
  onPress: () => void;
  customStyles?: object;
  disabled?: boolean;
  loading?: boolean;
}

const DefaultButton = ({
  text,
  onPress,
  customStyles,
  disabled,
  loading,
}: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        customStyles,
        disabled ? styles.disabledStyles : styles.enabledButton,
      ]}
      disabled={disabled}
    >
      {!loading ? (
        <DefaultText>{text}</DefaultText>
      ) : (
        <Loading loading size="small" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 22,
  },
  enabledButton: {
    backgroundColor: "#003f64ff",
  },
  disabledStyles: {
    backgroundColor: "#555555",
  },
});

export default DefaultButton;

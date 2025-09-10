import React from "react";
import { StyleSheet, Text } from "react-native";

interface DefaultTextProps {
  children: React.ReactNode;
  customStyles?: object;
}

const DefaultText = ({ children, customStyles }: DefaultTextProps) => {
  return <Text style={[styles.text, customStyles]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default DefaultText;

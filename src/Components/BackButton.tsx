import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface BackButtonProps {
  onPress?: () => void;
}
const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity style={styles.backButtonStyles} onPress={onPress}>
      <MaterialIcons name="arrow-back" size={30} color="#39ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonStyles: {
    marginLeft: 22,
    backgroundColor: "#3b3b3bff",
    padding: 5,
    borderRadius: 12,
    overflow: "hidden",
    height: 40,
    width: 40,
    textAlign: "center",
    textAlignVertical: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default BackButton;

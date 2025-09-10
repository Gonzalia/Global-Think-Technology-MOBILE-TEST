import { Switch, View } from "react-native";

interface SwitchStatusProps {
  status: "online" | "offline";
  onStatusChange: (status: "online" | "offline") => void;
}

const SwitchStatus = ({ status, onStatusChange }: SwitchStatusProps) => {
  return (
    <View>
      <Switch
        value={status === "online"}
        onValueChange={(value) => onStatusChange(value ? "online" : "offline")}
      />
    </View>
  );
};

export default SwitchStatus;

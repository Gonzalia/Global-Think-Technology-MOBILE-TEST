import { ActivityIndicator } from "react-native";

interface LoadingProps {
  size?: "small" | "large";
  color?: string;
  loading: boolean;
}

const Loading = ({
  size = "large",
  color = "#7ae4ffff",
  loading,
}: LoadingProps) => {
  if (!loading) return null;
  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;

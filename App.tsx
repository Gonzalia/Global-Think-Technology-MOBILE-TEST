import { StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import AllChatsScreen from "./src/Screens/AllChatsScreen";
import ChatScreen from "./src/Screens/ChatScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import { UserProvider } from "./src/Context/UserContext";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View
      style={[
        styles.container,
        { marginTop: StatusBar.currentHeight, marginBottom: 60 },
      ]}
    >
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AllChatsScreen"
              component={AllChatsScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424ff",
  },
});

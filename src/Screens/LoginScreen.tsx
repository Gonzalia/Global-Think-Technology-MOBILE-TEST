import { ImageBackground, StyleSheet, Text, View } from "react-native";
import DefaultText from "../Components/DefaultText";
import FieldInput from "../Components/FieldInput";
import { use, useState } from "react";
import DefaultButton from "../Components/DefaultButton";
import { useUser } from "../Context/UserContext";
import moment from "moment";

const LoginScreen = ({ navigation }: any) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { updateUser } = useUser();

  const handlePressButton = () => {
    try {
      updateUser({
        username: values.username,
        phone: "1234567890",
        status: "online",
        lastSeen: moment().toISOString(),
      });
      navigation.navigate("AllChatsScreen", { username: values.username });
      setValues({ username: "", password: "" });
    } catch (error) {
      console.error("Simulating an error on backend request");
    }
  };

  const validatePassword = (password: string) => {
    const minLength = 6;
    const hasNumber = /\d/;
    return password.length >= minLength && hasNumber.test(password);
  };
  return (
    <ImageBackground
      source={require("../Images/LoginSplash.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <DefaultText customStyles={styles.title}>Global Think Chat</DefaultText>

        <DefaultText customStyles={styles.slogan}>
          Connect, share, and chat with friends worldwide.
        </DefaultText>

        <View style={styles.formContainer}>
          <FieldInput
            placeholder="John Doe"
            value={values.username}
            onChangeText={(text) => setValues({ ...values, username: text })}
            label="Username"
          />

          <FieldInput
            placeholder="********"
            value={values.password}
            onChangeText={(text) => setValues({ ...values, password: text })}
            label="Password"
            secureTextEntry
          />

          <DefaultText customStyles={styles.passwordRules}>
            Remember your password must be at least 6 characters long and
            contain a number.
          </DefaultText>
          <DefaultButton
            customStyles={{ marginTop: 22 }}
            onPress={handlePressButton}
            text="LogIn"
            disabled={!values.username || !validatePassword(values.password)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 60,
  },
  formContainer: {
    marginTop: 64,
    backgroundColor: "#1b1b1bff",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slogan: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  passwordRules: {
    color: "#ffffffaa",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 22,
    marginVertical: 22,
  },
});

export default LoginScreen;

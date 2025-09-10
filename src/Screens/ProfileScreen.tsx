import { StyleSheet, View } from "react-native";
import DefaultText from "../Components/DefaultText";
import { useUser } from "../Context/UserContext";
import FieldInput from "../Components/FieldInput";
import { useState } from "react";
import SwitchStatus from "../Components/SwitchStatus";
import DefaultButton from "../Components/DefaultButton";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackButton from "../Components/BackButton";

const ProfileScreen = ({ navigation }: any) => {
  const { user, updateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<{
    username: string;
    phone: string;
    status: "online" | "offline";
    lastSeen: string;
  }>({
    username: user?.username || "",
    phone: user?.phone || "",
    status:
      user?.status === "online" || user?.status === "offline"
        ? user.status
        : "offline",
    lastSeen: user?.lastSeen || "",
  });

  const handleUpdateProfile = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        if (values.status === "online") {
          values.lastSeen = moment().toISOString();
        }
        updateUser(values);
        setLoading(false);
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.error("Simulating an error on backend request");
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <DefaultText customStyles={styles.title}>
            UPDATE YOUR PROFILE
          </DefaultText>
        </View>
        <FieldInput
          label="Username"
          value={values.username}
          onChangeText={(text) => setValues({ ...values, username: text })}
          placeholder="John Doe"
        />
        <FieldInput
          label="Phone"
          value={values.phone}
          onChangeText={(text) => setValues({ ...values, phone: text })}
          placeholder="+1 234 567 890"
        />

        <View style={styles.showOnlineContainer}>
          <DefaultText>Show online</DefaultText>
          <SwitchStatus
            status={values.status}
            onStatusChange={(status) =>
              setValues({
                ...values,
                status,
              })
            }
          />
        </View>

        <DefaultText customStyles={{ marginHorizontal: 22 }}>
          Last Seen: {moment(values.lastSeen).format("DD/MM/YYYY HH:mm")}
        </DefaultText>
      </View>
      <DefaultButton
        customStyles={{ marginTop: 20, paddingVertical: 22 }}
        text="Update Profile"
        disabled={!values.username || !values.phone}
        onPress={handleUpdateProfile}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424ff",
    justifyContent: "space-between",
    paddingVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  showOnlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 22,
  },
});

export default ProfileScreen;

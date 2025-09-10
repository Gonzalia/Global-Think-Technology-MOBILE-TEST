import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { chats } from "../services/LastChats";
import Loading from "../Components/Loading";
import DefaultText from "../Components/DefaultText";
import { useUser } from "../Context/UserContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

interface LastChats {
  id: number;
  contact: string;
  lastMessage: string;
  lastMessageTime: string;
}

const AllChatsScreen = ({ navigation, route }: any) => {
  const { username } = route.params;
  const [lastChats, setLastChats] = useState<LastChats[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchLastChats = async () => {
      try {
        setTimeout(() => {
          const response = chats;
          setLastChats(response);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Simulating an error on backend request");
      }
    };

    fetchLastChats();
  }, []);

  const chatView = (chat: LastChats) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        key={chat.id}
        onPress={() => navigation.navigate("ChatScreen", { contact: chat.id })}
      >
        <View style={styles.chatContainerHeader}>
          <DefaultText>
            From{" "}
            <DefaultText customStyles={styles.sender}>
              {chat.contact}
            </DefaultText>
          </DefaultText>
          <DefaultText>{chat.lastMessageTime}</DefaultText>
        </View>
        <DefaultText>
          <DefaultText customStyles={styles.chatMessageSays}>Says:</DefaultText>{" "}
          {chat.lastMessage}
        </DefaultText>
      </TouchableOpacity>
    );
  };

  const statusButton = () => {
    return (
      <View
        style={
          user?.status === "online"
            ? styles.onlineIndicator
            : styles.offlineIndicator
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <DefaultText customStyles={styles.welcomeText}>
          Welcome, {user?.username ?? username}!
        </DefaultText>
        {statusButton()}
      </View>

      <DefaultText customStyles={styles.profileStatus}>
        You are {user?.status}. Last connection at{" "}
        {moment(user?.lastSeen).format("HH:mm")}
      </DefaultText>
      <Loading loading={loading} />
      {!loading && lastChats.map((chat) => chatView(chat))}

      <TouchableOpacity
        style={styles.buttonProfile}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Text style={{ color: "#242424ff", fontWeight: "bold", fontSize: 16 }}>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.replace("LoginScreen")}
      >
        <MaterialIcons name="exit-to-app" size={22} color="#242424ff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424ff",
  },
  chatContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#555555",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 12,
  },
  profileStatus: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 16,
    color: "#b3b3b3ff",
  },
  welcomeView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  chatContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sender: {
    fontWeight: "bold",
    color: "#b9f9fdff",
  },
  chatMessageSays: { fontStyle: "italic" },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 32,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonProfile: {
    position: "absolute",
    bottom: 22,
    right: 30,
    backgroundColor: "#b9f9fdff",
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 5,
  },
  exitButton: {
    position: "absolute",
    bottom: 22,
    left: 30,
    backgroundColor: "#b9f9fdff",
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 22,
    elevation: 5,
    transform: [{ scaleX: -1 }],
  },
  onlineIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
  },
  offlineIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#f44336",
  },
});
export default AllChatsScreen;

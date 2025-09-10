import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import DefaultText from "../Components/DefaultText";
import { useEffect, useState } from "react";
import SendMessageInput from "../Components/Chats/SendMessageInput";
import { specificChats } from "../services/SpecificsChat";
import BackButton from "../Components/BackButton";
import { useUser } from "../Context/UserContext";
import moment from "moment";

const ChatScreen = ({ route }: any) => {
  const contact = route.params.contact;
  const [chatMessages, setChatMessages] = useState<any>([]);
  const { user, updateUser } = useUser();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        if (user?.status === "online") {
          updateUser({
            ...user,
            lastSeen: moment().toISOString(),
          });
        }
        const response = specificChats.find((chat: any) => chat.id === contact);
        setChatMessages(response ? response : []);
      } catch (error) {
        console.error("Simulated fetch error:", error);
      }
    };

    fetchChat();
  }, []);

  return (
    <ImageBackground
      source={require("../Images/chatBackground.jpg")}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.chatHeader}>
        <BackButton />

        <DefaultText customStyles={styles.senderText}>
          Your messages with {chatMessages.contact}
        </DefaultText>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <View style={{ flex: 1 }}>
          {chatMessages?.messages?.map((message: any, index: number) => (
            <View key={index} style={{ padding: 10 }}>
              <DefaultText
                customStyles={[
                  styles.messageBox,
                  {
                    fontWeight:
                      message.sender === chatMessages.contact
                        ? "bold"
                        : "normal",
                    textAlign:
                      message.sender === chatMessages.contact
                        ? "left"
                        : "right",
                    backgroundColor:
                      message.sender === chatMessages.contact
                        ? "rgba(141, 141, 141, 0.5)"
                        : "rgba(92, 217, 255, 0.5)",
                  },
                ]}
              >
                {message.content}
              </DefaultText>
            </View>
          ))}
        </View>

        <SendMessageInput />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    paddingVertical: 22,
    backgroundColor: "rgba(155, 155, 155, 0.19)",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    flexDirection: "row",
  },
  senderText: {
    fontWeight: "bold",
    paddingVertical: 5,
    marginLeft: 12,
    fontSize: 22,
  },
  messageBox: {
    backgroundColor: "rgba(141, 141, 141, 0.5)",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
  },
});

export default ChatScreen;

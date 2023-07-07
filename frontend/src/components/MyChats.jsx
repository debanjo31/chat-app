import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import Search from "./Search";
import Profile from "./Profile";
import { FaSun, FaMoon } from "react-icons/fa";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    darkMode,
    setDarkMode,
  } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // "https://chat-app-tien.onrender.com/api/chat",
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div
      className={`relative p-2 h-screen md:rounded-r-3xl  ${
        darkMode ? "bg-green-900 text-white" : "bg-green-50 text-green-900"
      }  ${selectedChat ? "md:w-2/6 hidden md:block" : "w-full md:w-2/6"}`}
    >
      <div className="flex justify-end text-lg mb-2">
        {darkMode ? (
          <FaSun onClick={() => setDarkMode(!darkMode)} />
        ) : (
          <FaMoon onClick={() => setDarkMode(!darkMode)} />
        )}
      </div>
      <div className="w-full flex flex-col mb-8 ">
        <div className="flex justify-between">
          <p className="text-2xl font-bold mb-2">CHATTIE</p>
          <Profile />
        </div>
        <Search />
        <GroupChatModal>
          <Button rightIcon={<AddIcon />}>New Group Chat</Button>
        </GroupChatModal>
      </div>
      <div>
        {chats ? (
          <Stack overflowY="scroll" className="">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                // bg={selectedChat === chat ? "#38B2AC" : "bg-white"}
                // color={selectedChat === chat ? "white" : "text-green-900"}
                className={` mb-4 p-2 rounded-md cursor-pointer ${
                  selectedChat === chat ? "" : " bg-blue-500"
                } ${
                  darkMode
                    ? " bg-green-50 text-green-900"
                    : "bg-green-900 text-white "
                }   `}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </div>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;

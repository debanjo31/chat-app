import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("https://chat-app-tien.onrender.com/api/chat", config);
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

  // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
  //     flexDir="column"
  //     alignItems="center"
  //     p={3}
  //     bg="white"
  //     w={{ base: "100%", md: "31%" }}
  //     borderRadius="lg"
  //     borderWidth="1px"
  //     className="relative"

  // pb={3}
  // px={3}
  // fontSize={{ base: "28px", md: "30px" }}
  // fontFamily="Work sans"
  // d="flex"
  // w="100%"
  // justifyContent="space-between"
  // alignItems="center"
  // className="h-96"
  return (
    <div className="bg-white p-2 md:p-6 text-green-800 w-2/6 rounded">
      <div className="w-full flex flex-col mb-8 ">
        <p className="text-2xl font-bold mb-2">My Chats</p>
        <GroupChatModal>
          <Button rightIcon={<AddIcon />}>New Group Chat</Button>
        </GroupChatModal>
      </div>
      <div>
        {chats ? (
          <Stack overflowY="scroll" className="">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
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
              </Box>
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

import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/modal";
import { Input } from "@chakra-ui/input";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import UserListItem from "./miscellaneous/userAvatar/UserListItem";

function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
    darkMode,
  } = ChatState();

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      //http://localhost:5000/api/user?search=${search}
      const { data } = await axios.get(
        `https://chat-app-tien.onrender.com/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
      console.log(searchResult); // Log the data variable
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      //http://localhost:5000
      const { data } = await axios.post(
        `https://chat-app-tien.onrender.com/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="w-5/6 flex-auto">
      <div
        className={`  rounded-lg mb-2 ${
          darkMode ? "bg-white bg-opacity-30" : "bg-green-900 bg-opacity-70 "
        }  `}
        onClick={onOpen}
      >
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom-end"
          className="w-full"
        >
          <div className="w-full text-left flex p-2 gap-4">
            <i className="fas fa-search text-white"></i>
            <Text className=" -mt-1 font-bold text-white">Search User</Text>
          </div>
        </Tooltip>
      </div>
      <div>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box d="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.map((data) => (
                  <UserListItem
                    key={data._id}
                    user={data}
                    handleFunction={() => accessChat(data._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default Search;

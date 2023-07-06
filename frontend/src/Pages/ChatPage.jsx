import { Box } from "@chakra-ui/layout";
import { useState } from "react";

import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, selectedChat, darkMode } = ChatState();
  console.log(selectedChat);

  return (
    <div className="h-screen w-full  bg-white ">
      <div
        className={` main-page w-full flex gap-2 justify-between  ${
          darkMode ? "bg-green-50 text-green-900" : "bg-green-900 text-white"
        } `}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

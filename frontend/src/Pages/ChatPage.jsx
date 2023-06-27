import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, selectedChat } = ChatState();
  console.log(selectedChat);
  return (
    <div className="h-screen w-full  bg-green-800 text-white">
      {user && <SideDrawer />}
      <div className="main-page w-full flex gap-2 justify-between">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

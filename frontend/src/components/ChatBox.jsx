import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

//className={selectedChat ? "md:hidden" : "md:block"}
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, darkMode, setDarkMode } = ChatState();

  return (
    <div
      className={`chatBox relative h-screen   md:rounded-l-3xl ${
        darkMode ? " bg-green-900 text-white" : "bg-green-50 text-green-900"
      }  w-full flex flex-col items-center  relative ${
        selectedChat ? "md:w-4/6 md:block" : " hidden md:block md:w-4/6 "
      }`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;

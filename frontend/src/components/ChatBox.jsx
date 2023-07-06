import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

//className={selectedChat ? "md:hidden" : "md:block"}
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, darkMode, setDarkMode } = ChatState();

  return (
    <div
      className={`chatBox relative md:rounded-l-3xl ${
        darkMode ? "bg-green-900 text-white" : "bg-green-50 text-green-900"
      }  w-full flex flex-col items-center rounded  relative ${
        selectedChat ? "w-full md:w-4/6" : "hidden md:block"
      }`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;

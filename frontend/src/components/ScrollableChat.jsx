import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user, darkMode } = ChatState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo._id;
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const dateTime = new Date(m.createdAt); // Access createdAt from individual message
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          const timeMessageSent = (hours % 12) + ":" + minutes + " " + ampm;

          return (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, userId) ||
                isLastMessage(messages, i, userId)) && (
                <Tooltip
                  label={m.sender?.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender?.name}
                    src={m.sender?.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  marginLeft: isSameSenderMargin(messages, m, i, userId),
                  marginTop: isSameUser(messages, m, i, userId) ? 3 : 10,
                  borderRadius: "10px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
                className={`${
                  m.sender?._id === userId
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {m.content}
                <p className="text-xs text-right">{timeMessageSent}</p>
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

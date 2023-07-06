const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, userId } = req.body;
  console.log(userId);
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    // Define path variable before using it in User.populate()
    const path = "chat.users";

    message = await User.populate(message, {
      path: path,
      select: "name pic email",
    });

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    const dateTime = new Date(message.createdAt);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const timeMessageSent = (hours % 12) + ":" + minutes + " " + ampm;
    res.json(timeMessageSent);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { allMessages, sendMessage };

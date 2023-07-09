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
  console.log(`userId is ${userId}`);
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
    message = Message.findOne({ _id: message._id })
      .populate("sender", "name pic")
      .populate("chat")
      .lean()
      .exec();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    // message = await message.populate("sender", "name pic");
    // message = await message.populate("chat");

    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "name pic email",
    // });
    // await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    // const dateTime = new Date(message.createdAt);
    // const hours = dateTime.getHours();
    // const minutes = dateTime.getMinutes();
    // const ampm = hours >= 12 ? "PM" : "AM";
    // const timeMessageSent = (hours % 12) + ":" + minutes + " " + ampm;
    res.json(message);
    console.log(message);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { allMessages, sendMessage };

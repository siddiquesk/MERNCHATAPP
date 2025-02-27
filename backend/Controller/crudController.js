const Chat=require("../models/chat")
module.exports.showChat=async (req, res) => {
  try {
    let chats = await Chat.find({});
    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found" });
    }
    res.json({chats });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.createChats=async (req, res) => {
  const { from, to, msg, date } = req.body;
  try {
    const newChat = new Chat({
      from: from, 
      to: to,
      msg: msg,
      date: date
    });
    const result = await newChat.save();
    res.json({ result });
  } catch (err) {
    res.status(400).json({ message: `Something went wrong: ${err}` });
  }
}
module.exports.editChats= async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found!" });
    }
    res.json(updatedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.destroyChats=async (req, res) => {
  try {
      const { id } = req.params; // Get ID from request params
      const deletedChat = await Chat.findByIdAndDelete(id); // MongoDB se delete

      if (!deletedChat) {
          return res.status(404).json({ message: "Chat not found" });
      }
      res.json({ message: "Chat deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
}
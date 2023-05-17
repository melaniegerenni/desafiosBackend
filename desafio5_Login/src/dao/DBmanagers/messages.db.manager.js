import messModel from "../models/messages.model.js";

class MessageDBManager {
  getMessages = async () => {
    try {
      const messages = await messModel.find().lean().exec();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  addMessage = async (message) => {
    try {
      const messageGenerated = new messModel(message);
      await messageGenerated.save();
      return this.getMessages();
    } catch (error) {
      console.log(error);
    }
  };
}

export default MessageDBManager;

import messageModel from "../models/message.model.js";

export default class Message {
  constructor() {
    this.model = messageModel;
  }

  getMessages = async () => {
    try {
      const messages = await this.model.find().lean().exec();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  addMessage = async (message) => {
    try {
      const messageGenerated = new this.model(message);
      await messageGenerated.save();
      return this.getMessages();
    } catch (error) {
      console.log(error);
    }
  };
}

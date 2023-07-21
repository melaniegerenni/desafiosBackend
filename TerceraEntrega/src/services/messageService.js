import Message from "../models/messageModel.js";
import Repository from "./Repository.js";

export default class MessageService extends Repository {
  constructor(dao) {
    super(dao, Message.model);
  }

  getMessages = async () => {
    try {
      const messages = await this.dao.models[this.model].find().lean().exec();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  addMessage = async (message) => {
    try {
      const messageGenerated = new this.dao.models[this.model](message);
      await messageGenerated.save();
      return this.getMessages();
    } catch (error) {
      console.log(error);
    }
  };
}
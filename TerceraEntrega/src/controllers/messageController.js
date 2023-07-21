import {messageService} from "../services/index.js";

export default class MessageController {
    constructor () {
        this.messageService = messageService;
    }

    getMessages = async (req, res) => {
        const user = req.user.user.first_name;
        const messages = await this.messageService.getMessages();
        messages.reverse();
        res.render("chat", { messages, user });
      };
}
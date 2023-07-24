export default class MessageService {
  constructor(dao) {
    this.dao = dao
  }

  getMessages = async () => await this.dao.getMessages()
  addMessage = async (message) => await this.dao.addMessage(message)
}
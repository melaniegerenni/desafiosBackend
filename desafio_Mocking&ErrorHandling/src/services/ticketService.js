export default class TicketService {
  constructor(dao) {
    this.dao = dao
  }

  createTicket = async (amount, purchaser) => await this.dao.createTicket(amount, purchaser)
  sendConfirmation = async (email) => await this.dao.sendConfirmation(email)
}

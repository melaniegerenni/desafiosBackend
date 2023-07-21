export default class TicketModel {
  static get model() {
    return "ticket";
  }

  static get schema() {
    return {
      code: { type: String },
      amount: { type: Number },
      purchaser: { type: String },
    };
  }
}

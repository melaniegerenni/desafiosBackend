export default class MessageModel {
  static get model() {
    return "messages";
  }

  static get schema() {
    return {
      user: String,
      message: String,
    };
  }
}

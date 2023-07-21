import Ticket from "../models/ticketModel.js";
import Repository from "./Repository.js";
import nodemailer from "nodemailer";

export default class TicketService extends Repository {
  constructor(dao) {
    super(dao, Ticket.model);
  }

  generateCode = () => {
    let result = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 24; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  createTicket = async (amount, purchaser) => {
    try {
      const code = this.generateCode();
      const ticket = { code, amount, purchaser };
      const generateTicket = new this.dao.models[this.model](ticket);
      await generateTicket.save();
      return generateTicket;
    } catch (error) {
      console.log(error);
    }
  };

  sendConfirmation = async (email, products) => {
    let config = {
      service: "gmail",
      //port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    };
    let transporter = nodemailer.createTransport(config);

    let message = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Compra realizada",
      html: `<h1>Compra realizada con éxito!</h1>`,
    };
    try {
      const info = await transporter.sendMail(message);
      return info;
    } catch (error) {
      console.log(error);
    }
  };
}

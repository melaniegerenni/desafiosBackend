import { Router } from "express";
const router = Router();
import MessageDBManager from "../dao/DBmanagers/messages.db.manager.js";
const messageManagerDB = new MessageDBManager();

router.get("/", async (req, res) => {
  const messages = await messageManagerDB.getMessages();
  messages.reverse();
  res.render("chat", { messages });
});

export default function (io) {
  io.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("message", async (data) => {
      const messages = await messageManagerDB.addMessage(data);
      io.emit("history", messages);
    });
  });
  return router;
}

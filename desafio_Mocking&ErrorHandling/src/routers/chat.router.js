import { Router } from "express";
const router = Router();
import MessageController from "../controllers/messageController.js";
const messageController = new MessageController();
import { messageService } from "../services/index.js";

router.get("/", messageController.getMessages);

export default function (io) {
  io.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.on("message", async (data) => {
      const messages = await messageService.addMessage(data);
      io.emit("history", messages);
    });
  });
  return router;
}
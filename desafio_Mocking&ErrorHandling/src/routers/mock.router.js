import { Router } from "express";
import MockController from "../controllers/mockController.js";
const mockController = new MockController();

const router = Router();

router.get('/', mockController.getMockProducts);

export default router;
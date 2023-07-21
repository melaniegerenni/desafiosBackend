import {Router} from "express";
const router = Router();
import passport from "passport";
import SessionsController from "../controllers/sessionsController.js";
const sessionsController = new SessionsController();
import { passportCall } from "../utils.js";

router.get("/register", sessionsController.renderRegister);
  
router.post("/register", passport.authenticate('register', {
    failureRedirect: '/api/sessions/failRegister'
  }), sessionsController.redirectToLogin);
  
router.get('/failRegister', sessionsController.renderError);
  
router.get("/login", sessionsController.renderLogin);
  
router.post("/login", passport.authenticate('login', {
    failureRedirect: '/api/sessions/failLogin'  
  }), sessionsController.login);
  
router.get('/failLogin', sessionsController.renderError);

router.get('/current', passportCall('current'), sessionsController.getUser);
  
router.get('/logout', sessionsController.logout);

export default router;
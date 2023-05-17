import { Router } from "express";
import UserManagerDB from "../dao/DBmanagers/user.db.manager.js";
const userManagerDB = new UserManagerDB();

const router = Router();

const notLogged = (req, res, next) => {
  if (!req.session.user) {
    return next();
  } else {
    res.redirect("/products");
  }
};

router.get("/register", notLogged, (req, res) => {
  res.render("sessions/register", {});
});

router.post("/register", async (req, res) => {
  const userNew = req.body;
  const response = await userManagerDB.addUser(userNew);
  if (response) {
    res.redirect("/sessions/login");
  } else {
    res.status(400).send("Error, intente nuevamente");
  }
});

router.get("/login", notLogged, (req, res) => {
  res.render("sessions/login", {});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userManagerDB.getUser(email, password);
  if (!user) {
    return res.status(401).render("errors/base", {
      error: "Error en email y/o contraseña",
    });
  }
  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    user.role = "admin";
  } else {
    user.role = "usuario";
  }
  console.log(user);
  req.session.user = user;
  res.redirect("/products");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("/errors/base", {
        error: err,
      });
    } else {
      res.redirect("/sessions/login");
    }
  });
});

export default router;

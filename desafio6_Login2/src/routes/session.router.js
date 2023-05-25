import { Router } from "express";
import passport from "passport";
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

router.post("/register", passport.authenticate('register', {
  failureRedirect: '/sessions/failRegister'
}), async (req, res) => {
  res.redirect("/sessions/login");
});

router.get('/failRegister', (req,res) => {
  res.render('errors/base', {error: 'Register failed!'});
})

router.get("/login", notLogged, (req, res) => {
  res.render("sessions/login", {});
});

router.post("/login", passport.authenticate('login', {
  failureRedirect: '/sessions/failLogin'
}), async (req, res) => {
  if (!req.user) {
    return res.status(400).render("errors/base", {
      error: "Invalid credentials",
    });
  }
  const {first_name, last_name, email, age} = req.user;
  let role;
  if (email === "adminCoder@coder.com") {
    role = "admin";
  } else {
    role = "usuario";
  }
  
  req.session.user = {
    first_name,
    last_name,
    email,
    age,
    role
  };
  res.redirect("/products");
});

router.get('/failLogin', (req,res) => {
  res.render('errors/base', {error: 'Login failed!'});
})

router.get('/github', passport.authenticate('github', {scope: ["user:email"]}), (req,res) => {})

router.get('/githubcallback', passport.authenticate('github', {
  failureRedirect: '/sessions/login'
}), async(req,res) => {
  req.session.user = req.user;
  res.redirect('/products')
})

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).render("/errors/base", {
        error: "Error al logout",
      });
    } else {
      res.redirect("/sessions/login");
    }
  });
});

export default router;

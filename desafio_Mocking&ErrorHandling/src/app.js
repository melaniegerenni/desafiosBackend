import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import run from "./run.js"
import { Server } from "socket.io";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./passport.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const httpServer = app.listen(8080, () => console.log("Server Up"));
const socketServer = new Server(httpServer);
run(socketServer, app);
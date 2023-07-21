import UserDTO from "../dtos/userDto.js";

export default class SessionsController {
    renderRegister = (req, res) => {
        res.render("sessions/register", {});
    }

    renderLogin = (req, res) => {
        res.render("sessions/login", {});
    }
    
    renderError = (req,res) => {
        res.render('errors/base', {error: 'Fail!'});
    }
    
    redirectToLogin = async (req, res) => {
        res.redirect("/api/sessions/login");
    }
    
    login = async (req, res) => {
        if (!req.user) {
          return res.status(400).render("errors/base", {
            error: "Invalid credentials",
          });
        }
        res.cookie(process.env.JWT_COOKIE_NAME, req.user.token).redirect('/products');
    }
    
    getUser = (req,res) => {
        const user = req.user.user;
        const userDTO =  new UserDTO(user);
        res.render('sessions/current', {user: userDTO});
    }
    
    logout = (req, res) => {
        res.clearCookie(process.env.JWT_COOKIE_NAME).redirect('/api/sessions/login');
    }
}




import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "./dao/models/users.model.js";
import { createHash, isValidPassword } from "./utils.js";

const localStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userModel.findOne({email: username});
            if(user) {
                console.log('User already exists');
                return done(null, user);
            }
            const newUser = {
                first_name, last_name, email, age,
                password: createHash(password)
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            console.log(error);
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await userModel.findOne({email: username});
            if(!user) {
                console.log('User not found');
                return done(null, false)
            }
            if(!isValidPassword(user, password)) {
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
        scope: ["user:email"]
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const user = await userModel.findOne({email: profile.emails[0].value});
            if(user) return done(null, user);

            const newUser = await userModel.create({
                first_name: profile._json.name,
                email: profile.emails[0].value,
            });

            return done(null, newUser);
        } catch (error) {
            return done('Error to login with Github')
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async(id,done) => {
        const user = await userModel.findById(id);
        done(null, user)
    })
}

export default initializePassport;
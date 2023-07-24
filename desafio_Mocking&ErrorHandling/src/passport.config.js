import passport from "passport";
import local from "passport-local";
import passport_jwt from 'passport-jwt';
import GitHubStrategy from "passport-github2";
import {userService} from './services/index.js'
import { createHash, isValidPassword, generateToken, extractCookie } from "./utils.js";

const localStrategy = local.Strategy;
const JWTStrategy = passport_jwt.Strategy;
const ExtractJWT = passport_jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userService.getUser(username);
            if(user) {
                console.log('User already exists');
                return done(null, user);
            }
            const newUser = {
                first_name, last_name, email, age,
                password: createHash(password)
            }
            const result = await userService.addUser(newUser);
            return done(null, result);
        } catch (error) {
            console.log(error);
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async(username, password, done) => {
        try {
            const user = await userService.getUser(username);
            if(!user) {
                console.log('User not found');
                return done(null, false)
            }
            if(!isValidPassword(user, password)) {
                return done(null, false)
            }

            const token = generateToken(user);
            user.token = token;

            return done(null, user)
        } catch (error) {
            
        }
    }))

/*     passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
        scope: ["user:email"]
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await userService.getUser(profile.emails[0].value);
            if(user) {
                const token = generateToken(user);
                user.token = token;
                return done(null, user);
            }

            const newUser = await userService.addUser({
                first_name: profile._json.name,
                email: profile.emails[0].value,
            });

            const token = generateToken(newUser);
            newUser.token = token;

            return done(null, newUser);
        } catch (error) {
            return done('Error to login with Github')
        }
    })) */

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: process.env.JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        done(null, jwt_payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async(id,done) => {
        const user = await userService.getUserById(id);
        done(null, user)
    })
}

export default initializePassport;
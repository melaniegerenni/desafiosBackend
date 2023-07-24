import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import {fakerES as faker} from "@faker-js/faker";


export default __dirname

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateToken = user => {
    return jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h'})
}

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[process.env.JWT_COOKIE_NAME] : null
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err)
            if (!user) return res.status(401).render('errors/base', {
                error: info.messages ? info.messages : info.toString()
            })
            req.user = user
            next()
        })(req, res, next)
    }
}

export const handlePolicies = policies => (req, res, next) => {
    if (policies.includes('PUBLIC')) return next()
    if (policies.length > 0) {
        const user = req.user.user;
        if (!policies.includes(user.role.toUpperCase())) {
            return res.render('errors/base', {error: "Not auth"})
        }
    }
    next()
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        status: true,
        stock: 10,
        category: faker.commerce.department(),
        thumbnail: faker.image.urlPicsumPhotos()
    }
}
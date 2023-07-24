import dotenv from 'dotenv';
dotenv.config();

export default {
    app: {
        persistence: process.env.PERSISTENCE
    },
    mongo: {
        url: process.env.DB_STRING
    }
}
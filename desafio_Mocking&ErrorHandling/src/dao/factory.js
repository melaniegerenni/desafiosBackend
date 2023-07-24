import config from "../config/config.js";

export default class PersistenceFactory {
    static getPersistence = async() => {
        switch(config.app.persistence) {
            /* case "MEMO":
                let { default: MemoDao } = await import ('./memoryDao.js')
                return new MemoDao()
            case "FILE":
                let { default: FileDao } = await import ('./fileDao.js')
                return new FileDao() */
            case "MONGO":
                let { default: MongoDao } = await import ('./mongo/MongoDao.js')
                return new MongoDao()
        }
    }
}
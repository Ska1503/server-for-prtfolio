import mongoose from 'mongoose'
import { Logger } from '../utils'
import { Config } from '../config'

Config.loadConfig()

class Database {
  public async connect() {
    try {
      await mongoose.connect(Config.getMongoURI() || '')
      Logger.info('MongoDB connected')
    } catch (error) {
      Logger.error(`Error connecting to MongoDB: ${error}`)
      process.exit(1)
    }
  }
}
export default new Database()

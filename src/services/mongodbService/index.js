import mongoose from "mongoose"
import { config } from "../../config/index.js"

const init = async () => {
  try {
    if (config.server.SELECTED_PERSISTENCE !== config.persistences.mongodb) return
    await mongoose.connect(config.MONGO_DB.URL, {
      dbName: config.MONGO_DB.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connection with mongodb established")
  } catch (error) {
    console.error(error)
  }
}

const MongodbService = {
  init,
}

export { MongodbService }
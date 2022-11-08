import mongoose from "mongoose";
import { config } from "../config/index.js"

export default class MongoClient {
  constructor() {
    this.connection = mongoose.connect(
      config.MONGO_DB.URL,
      {
        dbName: config.MONGO_DB.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err)
          process.abort()
        }
        console.log("Connection with mongodb established")
      }
    )
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new MongoClient()
    } else {
      return this.instance
    }
  }
}

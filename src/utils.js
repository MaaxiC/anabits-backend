import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import winston from "winston"

//Bcrypts
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validatePassword = (user, password) => bcrypt.compareSync(password, user.password)

//Get current file path
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

//Logger
export const debugLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({level: 'info'}),
    new winston.transports.File({ level: "warn", filename: "warn.log" }),
    new winston.transports.File({ level: "error", filename: "error.log" }),
  ],
});
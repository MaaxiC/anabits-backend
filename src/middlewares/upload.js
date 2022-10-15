import multer from 'multer'
import { __dirname } from '../utils.js'
import path from 'path';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, './public/uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({ storage: fileStorage }).single("avatar")
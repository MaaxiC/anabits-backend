import { debugLogger } from "../utils.js"

const logger = () => (req, res, next) => {
    req.logger = debugLogger;
    next();
}

export { logger }
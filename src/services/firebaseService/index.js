import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { config } from "../../config/index.js"

const init = async () => {
    try {
        if (config.server.SELECTED_PERSISTENCE !== config.persistences.firebase) return
        await initializeApp({ credential: applicationDefault() })
        console.log("Connection with firebase established")
    } catch (error) {
        console.error(error)
    }
}

const FirebaseService = { 
    init
}

export { FirebaseService }
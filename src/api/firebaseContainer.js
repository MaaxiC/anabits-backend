import { DATE } from "../utils/index.js"
import { FirebaseService } from "../services/firebaseService/index.js"
import { getFirestore } from "firebase-admin/firestore"

FirebaseService.init()

class FirebaseContainer {
    constructor ({ collection }){
        this.db = getFirestore()
        this.collection = collection
    }

    async getAll() {
        try {
            const querySnapshot = await this.db.collection(this.collection).get()
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return products
        } catch (error) {
            return error
        }
    }

    async getById(id) {
         try {
            // const products = await this.getAll()
            // const product = products.find(value => value.id == id)
            const product = await this.db.collection(this.collection).doc(id).get()
            const productData = {
                id: product.id,
                ...product.data()
            }
            return productData
         } catch (error) {
            return error
         }
    }

    async save(obj) {
        try {
            obj.timestamp = DATE.getTimestamp()
            const row = await this.db.collection(this.collection).add(obj)
            obj.id = row.id
            return obj
        } catch (error) {
            return error
        }
    }

    async update(id, data) {
        try {
            const product = await this.db.collection(this.collection).doc(id).get()
            if (product.data()) {
                await this.db.collection(this.collection).doc(id).update(data)
                const productUpdated = {
                    id: product.id,
                    ...data
                }
                return productUpdated
            } else {
                return undefined
            }
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const product = await this.db.collection(this.collection).doc(id).get()
            if (product.data()) {
                const productDeleted = await this.db.collection(this.collection).doc(id).delete()
                return productDeleted
            } else {
                return undefined
            }
        } catch (error) {
            return error
        }
    }
}

export { FirebaseContainer }
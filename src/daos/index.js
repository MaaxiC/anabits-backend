import ProductMongodb from './products/productMongodb.js'
//import ProductFirebase from './products/productFirebase.js'
import CartMongodb from './carts/cartMongodb.js'
//import CartFirebase from './carts/cartFirebase.js'

const db = PROCESS.ENV.TIPO_DB || 'mongodb'

let productoDao 
let carritoDao

switch(db){
    case 'mongodb': 
        productoDao = new ProductMongodb()
        carritoDao = new CartMongodb()
        break
    
    default:
//        productoDao = new ProductFirebase()
//        carritoDao = new CartFirebase()
        break      
}

export { productoDao, carritoDao }
import { API_ROUTES } from "./routes.js"
import { utils } from "./utils.js"

const productsContainer = document.getElementById("productsContainer")

const getProducts = async () => {
    const products = await API_ROUTES.getProducts()
    productsContainer.innerHTML = await utils.createProductCard(products)
}

if (productsContainer){
    window.addEventListener('load', getProducts)
}
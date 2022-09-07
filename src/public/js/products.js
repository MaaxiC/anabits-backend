import { API_ROUTES } from "./routes.js"
import { utils } from "./utils.js"

const getProducts = async () => {
    const products = await API_ROUTES.getProducts()
    productsContainer.innerHTML = await utils.createProductCard(products)
}

window.addEventListener('load', getProducts)
import { API_ROUTES } from "./routes.js"
import { utils } from "./utils.js"

const getProducts = async () => {
    productsContainer.innerHTML = `
    <div id="cont" class="container d-flex justify-content-center mt-5">
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    const products = await API_ROUTES.getProducts()
    productsContainer.innerHTML = await utils.createProductCard(products)
}

window.addEventListener('load', getProducts)
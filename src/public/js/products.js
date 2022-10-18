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

    const btnProduct = document.querySelectorAll(".btn-product")
    const cartID = document.querySelector("#cartID")

    for (let i = 0; i < btnProduct.length; i++) {
        btnProduct[i].addEventListener("click", async (e) => {
            try {
                const product = { productId: e.target.id }
                await API_ROUTES.addProductToCart(cartID.value, product)
            } catch (error) {
                console.log({status: 'error', error: error.message})
            }
        })
    }
}

window.addEventListener('load', getProducts())
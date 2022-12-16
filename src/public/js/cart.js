import { API_ROUTES } from "./routes.js"
import { utils } from "./utils.js"

const listProductsInCart = async () => {
    const cartID = document.querySelector("#cart").value
    const cardProduct = document.querySelector("#card-product")

    cardProduct.innerHTML = `
    <div id="cont" class="container d-flex justify-content-center mt-5">
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    const listOfProducts = await API_ROUTES.getProductsInCart(cartID)
    cardProduct.innerHTML = await utils.createCartProductCard(listOfProducts.productos)

    const btnDeleteProduct = document.querySelectorAll(".btn-delete")

    for (let i = 0; i < btnDeleteProduct.length; i++) {
        btnDeleteProduct[i].addEventListener("click", async (e) => {
            try {
                await API_ROUTES.deleteProductFromCart(cartID, e.currentTarget.id)
                listProductsInCart()
            } catch (error) {
                console.log({status: 'error', error: error.message})
            }
        })
    }

    const btnCheckout = document.getElementById('btnCheckout')

    if (btnCheckout) {
        btnCheckout.addEventListener('click', async (e) => {
            e.preventDefault()
            await API_ROUTES.deleteAllProductsFromCart(cartID)
            utils.createAlertWithCallback('success', 'Compra realizada', 'Gracias por su compra. Se le enviará un mail con los detalles de su compra.')
        })
    }
}

window.addEventListener('load', listProductsInCart)
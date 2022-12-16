const getProducts = async () => {
    const response = await fetch("/api/productos")
    const products = await response.json()
    return products
}

const getProductById = async (id) => {
    const response = await fetch(`/api/productos/${id}`)
    const product = await response.json()
    return product
}

const addProductToCart = async (id, product) => {
    const response = await fetch(`/api/carrito/${id}/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    const cartUpdated = await response.json()
    return cartUpdated
}

const getProductsInCart = async (id) => {
    const response = await fetch(`/api/carrito/${id}/productos`)
    const products = await response.json()
    return products
}

const deleteProductFromCart = async (id, id_prod) => {
    const response = await fetch(`/api/carrito/${id}/productos/${id_prod}`, {
        method: "DELETE"
    })
    const cartUpdated = await response.json()
    return cartUpdated
}

const deleteAllProductsFromCart = async (id) => {
    const response = await fetch(`/api/carrito/${id}/productos`, {
        method: "DELETE"
    })
    const cartUpdated = await response.json()
    return cartUpdated
}
  
export const API_ROUTES = { getProducts, getProductById, addProductToCart, getProductsInCart, deleteProductFromCart, deleteAllProductsFromCart }
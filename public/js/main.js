import { API_ROUTES } from "./routes.js"
import { utils } from "./utils.js"

//Products
const productsContainer = document.getElementById("productsContainer")
const chatContainer = document.getElementById("chatContainer")

const getProducts = async () => {
    const products = await API_ROUTES.getProducts()
    productsContainer.innerHTML = await utils.createProductCard(products)
}

if (productsContainer){
    window.addEventListener('load', getProducts)
}

//Messages
if (chatContainer) {
    const socket = io.connect()

    socket.on('listOfMessages', (listOfMessages) => {
        getMessages(listOfMessages)
    })
    
    document.getElementById('sendMessage').addEventListener('click', async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const nombre = document.getElementById('nombre').value
        const apellido = document.getElementById('apellido').value
        const edad = document.getElementById('edad').value
        const alias = document.getElementById('alias').value
        const avatar = document.getElementById('avatar').value
        const text = document.getElementById('text').value
        const timestamp = (new Date).toLocaleString()
        const chatMessage = {
            author: { 
                id: email,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                alias: alias,
                avatar: avatar,
            },
            text: text,
            timestamp: timestamp,
        }
        document.getElementById('text').value = ''
        socket.emit('sendMessage', chatMessage)
    })
    
    const getMessages = listOfMessages => {
        const chat = listOfMessages.map( msg => `<b style="color:blue">${msg.author.id}</b> - <n style="color:brown">${msg.timestamp}</n> : <i style="color:green">${msg.text}</i>`).join('<br>')
        document.getElementById('chat').innerHTML = chat
    }
}



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
    
    document.getElementById('sendMessage').addEventListener('click', (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const message = document.getElementById('message').value
        const timestamp = (new Date).toLocaleString();
        if (email.trim() != '') {
            const chatMessage = { email, message, timestamp }
            document.getElementById('email').value = ''
            document.getElementById('message').value = ''
            socket.emit('sendMessage', chatMessage)
        }
    })
    
    const getMessages = listOfMessages => {
        const chat = listOfMessages.map( msg => `<b style="color:blue">${msg.email}</b> - <n style="color:brown">${msg.timestamp}</n> : <i style="color:green">${msg.message}</i>`).join('<br>')
        document.getElementById('chat').innerHTML = chat
    }
}



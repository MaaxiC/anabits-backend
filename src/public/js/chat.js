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
            email: email,
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
    const chat = listOfMessages.map( msg => `<b style="color:blue">${msg.author.email}</b> - <n style="color:brown">${msg.timestamp}</n> : <i style="color:green">${msg.text}</i>`).join('<br>')
    document.getElementById('chat').innerHTML = chat
}
const socket = io.connect()
socket.on('listOfMessages', (listOfMessages) => {
    getMessages(listOfMessages)
})

document.getElementById('sendMessage').addEventListener('click', async (e) => {
    e.preventDefault()
    const text = document.getElementById('text').value
    const timestamp = (new Date).toLocaleString()
    const chatMessage = {
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
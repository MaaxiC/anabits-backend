const socket = io.connect()

socket.on('listOfProducts', (listOfProducts) => {
    getProducts(listOfProducts)
})

socket.on('listOfMessages', (listOfMessages) => {
    getMessages(listOfMessages)
})

document.getElementById('send').addEventListener('click', () => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const product = { title, price, thumbnail }

    socket.emit('addProduct', product)
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

const getProducts = listOfProducts => {
    let table = `
    <div class="container mt-5">
    <h1 style="color:blue" class="d-flex justify-content-center mb-3">List of products</h1>
    <div class="table-responsive d-flex justify-content-center" >
        <table class="table table-dark align-middle text-center" style="width: 500px;">
            <tr style="color: yellow;"> <th>Title</th> <th>Price</th> <th>Thumbnail</th> </tr>
    `
    for (const product of listOfProducts) {
        table += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td><img class="images" src="${product.thumbnail}" width="150"></td>
            </tr>
        `
    }
    table += `</table>`
    document.getElementById('listOfProducts').innerHTML = table;
}

const getMessages = listOfMessages => {
    const chat = listOfMessages.map( msg => `<b style="color:blue">${msg.email}</b> - <n style="color:brown">${msg.timestamp}</n> : <i style="color:green">${msg.message}</i>`).join('<br>')
    document.getElementById('chat').innerHTML = chat
}


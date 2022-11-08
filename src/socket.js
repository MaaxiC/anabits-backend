import { normalize, schema } from "normalizr"
import { debugLogger } from "./utils.js"
import MessageService from "./services/messageService.js"

const socket = (io) => {
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  )
  const messageSchema = new schema.Entity("messages", {
    author: authorSchema,
  })
  const chatSchema = new schema.Entity("chats", {
    messages: [messageSchema],
  })

  io.on("connection", async (socket) => {
    socket.emit("listOfMessages", await MessageService.getMessages())
    socket.on("sendMessage", async (data) => {
      try {
        const { email, nombre, apellido, edad, alias, avatar } =
          socket.request.session.user
        const { text, timestamp } = data
        const message = {
          author: {
            email,
            nombre,
            apellido,
            edad,
            alias,
            avatar,
          },
          text,
          timestamp,
        }
        await MessageService.addMessage(message)
        const getMessages = await MessageService.getMessages()
        const getList = getMessages.map((message) => ({
          id: message._id,
          author: {
            email: message.author.email,
            nombre: message.author.nombre,
            apellido: message.author.apellido,
            edad: message.author.edad,
            alias: message.author.alias,
            avatar: message.author.avatar,
          },
          text: message.text,
          timestamp: message.timestamp,
        }))
        const listMessages = {
          id: "mensajes",
          messages: getList,
        }
        const normalizedObject = normalize(listMessages, chatSchema)
        io.sockets.emit("listOfMessages", await MessageService.getMessages())
        return console.log(JSON.stringify(normalizedObject, null, "\t"))
      } catch (error) {
        debugLogger.error(error.message)
        return
      }
    })
  })
}

export { socket }

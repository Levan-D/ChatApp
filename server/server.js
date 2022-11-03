/** @format */

const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
  },
})

io.on("connection", socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on("send-message", chat => {
    console.log(chat.chat.senderId)
    chat.chat.selected = false
    chat.chat.messages.push(chat.msg)
    chat.chat.members.push(chat.chat.senderId)

    chat.chat.members.forEach(member => {
      const newChat = chat.chat
      let index = newChat.members.indexOf(member)
      newChat.members.splice(index, index + 1)

      socket.broadcast.to(member).emit("receive-message", newChat)
    })
  })
})

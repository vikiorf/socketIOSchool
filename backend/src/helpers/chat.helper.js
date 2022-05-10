const Chat = require('../models/ChatMessage')

exports.findAllChatMessages = async () => {
  const messages = await Chat.find()
  return messages
}

exports.addChatMessage = async message => {
  const date = new Date().toISOString()
  const newMessage = new Chat({
    user: message.user,
    dateTime: date,
    message: message.message
  })

  const savedMessage = await newMessage.save()

  return savedMessage
}

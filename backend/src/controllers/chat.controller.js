const { findAllChatMessages } = require('../helpers/chat.helper')

exports.findAllChatMessages = async (req, res) => {
  const messages = await findAllChatMessages()

  return res.json({
    success: true,
    error: '',
    data: messages
  })
}

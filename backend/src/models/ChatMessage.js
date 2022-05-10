const mongoose = require('mongoose')

// Define Schema
const chatMessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('ChatMessage', chatMessageSchema)

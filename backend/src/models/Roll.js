const mongoose = require('mongoose')

// Define Schema
const rollSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  roll: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Roll', rollSchema)

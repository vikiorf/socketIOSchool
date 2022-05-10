const express = require('express')
const router = express.Router()

// Import routes
router.use('/roll', require('./roll.routes'))
router.use('/chat', require('./chat.routes'))

module.exports = router

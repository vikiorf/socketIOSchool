const express = require('express')
const router = express.Router()

const { findAllChatMessages } = require('../controllers/chat.controller')

router.get('/', findAllChatMessages)

module.exports = router

const express = require('express')
const router = express.Router()

const { findAllRolls } = require('../controllers/roll.controller')

router.get('/', findAllRolls)

module.exports = router

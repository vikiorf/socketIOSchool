//import dotenv
require('dotenv').config()

const morgan = require('morgan')
const mongoose = require('./src/config/database')
const pkg = require('./package.json')
const cors = require('cors')

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// Route imports
const routes = require('./src/routes/api')
const { addChatMessage } = require('./src/helpers/chat.helper')

const port = process.env.PORT || 3000

// DB settings
mongoose.connection.on(
  'error',
  // eslint-disable-next-line
  console.error.bind(console, 'DB Connection Error')
)

// Settings
app.set('pkg', pkg)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api', routes)

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

server.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server running on port:', port)
})

io.on('connection', async socket => {
  let userTotalSum = 0
  const query = socket.handshake.query
  // eslint-disable-next-line
  console.log('a user connected', query.name)
  io.emit('userConnect', query.name)

  socket.on('chatMessage', message => {
    const messageObject = { user: query.name, message }
    io.emit('chatMessage', messageObject)
    addChatMessage(messageObject)
  })

  socket.on('rollDice', () => {
    const randDice = Math.floor(Math.random() * 6 + 1)
    userTotalSum += randDice
    io.emit('rolledDice', { user: query.name, total: userTotalSum })
  })
})

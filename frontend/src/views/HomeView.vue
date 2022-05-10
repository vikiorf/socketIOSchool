<template>
  <div class="board">
    <div class="dice">
      <p v-for="roll in diceRolls" :key="roll.user">
        {{ roll.user }} - {{ roll.total }}
      </p>
      <input type="button" value="Roll Dice" @click="rollDice" />
    </div>
  </div>
  <div class="chat">
    <p v-for="message in messages" :key="message">{{ message }}</p>
    <form @submit.prevent="sendChatMessage">
      <input type="text" v-model="chatInput" />
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
  import { io } from 'socket.io-client'

  export default {
    data() {
      return {
        diceRolls: [],
        messages: [],
        chatInput: null,
        connection: null
      }
    },
    mounted() {
      this.connection = io('http://localhost:3000', {
        query: { name: this.$route.params.name }
      })

      this.connection.on('userConnect', (user) => {
        this.messages.push(`${user} connected`)
      })

      this.connection.on('chatMessage', (message) => {
        this.messages.push(`${message.user}: ${message.message}`)
      })

      this.connection.on('rolledDice', (dice) => {
        this.diceRolls.push(dice)
      })

      this.connection.on('userDisconnect', (user) => {
        this.messages.push(`${user} disconnected`)
      })
    },
    methods: {
      rollDice() {
        this.connection.emit('rollDice')
      },
      sendChatMessage() {
        this.connection.emit('chatMessage', this.chatInput)
        this.chatInput = null
      }
    }
  }
</script>

<style scoped></style>

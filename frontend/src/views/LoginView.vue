<template>
  <form @submit.prevent="login">
    <input type="text" v-model="name" placeholder="Type your name..." />
    <input type="submit" value="Login" />
  </form>
</template>

<script>
  import { mapStores } from 'pinia'
  import { useUserStore } from '../stores/userStore'

  export default {
    data() {
      return {
        name: null
      }
    },
    computed: {
      ...mapStores(useUserStore)
    },
    methods: {
      login() {
        this.$router.push('/' + this.name)
      }
    }
  }
</script>

<style scoped></style>

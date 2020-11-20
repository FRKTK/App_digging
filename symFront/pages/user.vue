<template>
    <div class="container">
    <h1>Please login to see the secret content</h1>
    <div v-if="!this.$auth.user">
        Not logged
    </div>
    <div v-else>
      Hello {{ username }} {{ email }}!
      <pre>I am the secret content, I am shown only when the user is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button>
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="">
        Super secret page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                email: this.$auth.user.email,
                username: this.$auth.user.username,
                userId: this.$auth.user.id
            }
        },
        mounted() {
          if(!this.$store.getters.isAuthenticated){
            this.$router.replace('/login')
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>
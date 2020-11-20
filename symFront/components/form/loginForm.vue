<template>
    <section class="mt-5">
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h4>Login Form</h4>
              </div>
              <form @submit="login">
                <div class="form-group">
                  <label for="title">E-mail Address</label>
                  <input type="text" class="form-control" v-model="email" required/>
                </div>
                <div class="form-group">
                  <label for="artist">Password</label>
                  <input type="password" class="form-control" v-model="password"/>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      components: {
        
      },

      data() {
        return {
          email: '',
          password: '',
          error: null
        }
      },

      methods: {
        async login (e) {
          e.preventDefault()
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            }).then((res) => {     
              var status = res.status        
              if(status === 201){
                var userId = res.data.user
                var token = res.data.token
                var isAdmin = res.data.isAdmin
                
                this.$router.replace('/user')
              }
            })
            this.email = ''
            this.password = ''
            this.error = null
          } catch (res) {
            console.log('Catch: ' + res)
          }
        }
      },
      mounted() {
        if(this.$store.getters.isAuthenticated){
          this.$router.replace('/user/me')
        }
      },
}
</script>

<style scoped>

</style>
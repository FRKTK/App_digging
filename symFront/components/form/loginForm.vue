<template>
  <form @submit="login">
    <div class="form-group">
      <label for="title">E-mail Address</label>
      <input type="text" class="form-control" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="artist">Password</label>
      <input type="password" class="form-control" v-model="password" required />
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },

  methods: {
    async login(e) {
      e.preventDefault();
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then((res) => {
            var status = res.status;
            if (status === 201) {
              this.$emit('successLogin')
              var userId = res.data.user;
              var token = res.data.token;
              var isAdmin = res.data.isAdmin;

              this.$router.replace("/user");
            }
          });
        this.email = "";
        this.password = "";
        this.error = null;
      } catch (res) {
        console.log("Catch: " + res);
      }
    },
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace("/user/me");
    }
  },
};
</script>

<style scoped>
</style>
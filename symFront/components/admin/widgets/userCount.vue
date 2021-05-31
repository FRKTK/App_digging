<template>
  <div>
    <template>
        <b-col>
          <b-card no-body class="overflow-hidden">
              <b-col>
                <b-card-body style="text-align: left">
                  <h2 talign="center">
                    {{ users.length }}
                  </h2>
                  <small>users</small><br>
                  <nuxt-link to="/admin/users">
                    <b-button>View all</b-button>
                  </nuxt-link>
                </b-card-body>
              </b-col>
          </b-card>
        </b-col>
    </template>
  </div>
</template>

<script>
export default {
  auth: true,
  layout: "admin",
  name: 'WidgetUsers',
  data() {
    return {
      users: '',
    }
  },
  beforeCreate() {
    
  },
  created() {
    this.$axios.get(process.env.apiUrl + '/admin/users')
    .then((res) => this.users = res.data)
  },
};
</script>

<style lang="scss" scoped>
</style>
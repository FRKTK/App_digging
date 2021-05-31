<template>
  <div>
    <template>
        <b-col>
          <b-card no-body class="overflow-hidden">
              <b-col>
                <b-card-body style="text-align: left">
                  <h2 talign="center">
                    {{ reports.length }}
                  </h2>
                  <small>Tracks reported</small><br>
                  <nuxt-link to="/admin/reported">
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
  name: 'WidgetReport',
  data() {
    return {
      reports: '',
    }
  },
  beforeCreate() {
    
  },
  created() {
    this.$axios.get(process.env.apiUrl + '/admin/tracks/reported/')
    .then((res) => this.reports = res.data)
  },
};
</script>

<style lang="scss" scoped>
</style>
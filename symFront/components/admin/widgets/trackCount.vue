<template>
  <div>
    <template>
        <b-col>
          <b-card no-body class="overflow-hidden">
              <b-col>
                <b-card-body style="text-align: left">
                  <h2 talign="center">
                    {{ tracks.length }}
                  </h2>
                  <small>tracks</small><br>
                  <nuxt-link to="/admin/tracks">
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
  name: 'WidgetTracks',
  data() {
    return {
      tracks: '',
    }
  },
  beforeCreate() {
    
  },
  created() {
    this.$axios.get(process.env.apiUrl + '/admin/tracks')
    .then((res) => this.tracks = res.data)
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div v-if="reported.length">
    <div v-for="(track, i) in tracks" :key="i" >
      <musicComponent :track="track" />
      {{ viewReports(track) }}
      <b-button @click="treatReport" :value='viewReports(track)'>Treat</b-button>
    </div>
  </div>
</template>

<script>
import musicComponent from "@/components/admin/Music";

export default {
  auth: true,
  layout: "admin",
  name: "reported",
  components: {
    musicComponent: musicComponent,
  },
  data() {
    return {
      reported: [],
      tracks: [],
    };
  },
  computed: {
    removeDoubleTrack () {
      return this.tracks.find((res) => res.linkId == value.id)
    }
  },
  methods: {
    viewReports (value) {
      const reports = Object.values(this.reported).filter((res) => res.linkId === value.id)
      return reports
    },
    getReports () {
      this.tracks = []
      this.$axios
      .get(process.env.apiUrl + "/admin/tracks/reported")
      .then((res) => {
        // this.reported = res.data;
        const data = res.data
        if (data.length > 0) {
          for (const i in data) {
            const reported = data.find(res => res.linkId === data[i].linkId)
            this.reported.push(reported)
            // console.log(data[i])
          }
        }
        // if (this.reported.length > 0) {
        //   for (let i = 0; i < this.reported.length; i++) {
        //   this.$axios
        //     .get(process.env.apiUrl + "/track/" + this.reported[i].linkId)
        //     .then((res) => this.tracks.push(res.data))
        //   }
        // } else {
        //   return 'no tracks reported'
        // }
      })
    },
    treatReport (e) {
      console.log(e.target.value)
      // const reportId = e.target.value
      // this.$axios
      // .put(process.env.apiUrl + '/admin/tracks/reported/treat/' + reportId)
      // .then((res) => this.getReports())
      // .catch((err) => console.log(err))
    }
  },
  created() {
    this.getReports()
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div id="app">
      <div>
        <client-only>
          <!-- && likedTracks.length pour v-if -->
          <!-- Widgets :
          - Usercount : Deleted et non deleted
          - TrackCount : Visible et non visible
          - ReportCount : à traiter -->
          <b-row class="mt-3 w-100" offset="3">
            <userCount />
            <trackCount />
            <reportCount />
          </b-row>
         <!-- <div
            v-if="tracks.length"> 
            <musicComponent 
              v-for="(track, i) in tracks" :key="i" 
              :track="track"
              />
            </div> -->
        </client-only>
      </div>
  </div>
</template>

<script>
import musicComponent from "@/components/admin/Music";
import userCount from "@/components/admin/widgets/userCount"
import trackCount from "@/components/admin/widgets/trackCount"
import reportCount from "@/components/admin/widgets/reportCount"
import { BContainer } from "bootstrap-vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  auth: true,
  layout: 'admin',
  components: {
    musicComponent,
    userCount,
    trackCount,
    reportCount,
  },
  data() {
    return {
      tracks: [],
    };
  },
  async fetch() {
  
  },
  computed: {
  },
  methods: {
    isLiked(id)  {
      if(this.likedTracks.length) {
        return Object.values(this.likedTracks).find(t => t.LinkId == id) ? true : false
      }
      return false
    }
  },
  mounted() {
    axios.get(process.env.apiUrl + "/admin/tracks?fields=id,link,userId,visible", {
          headers: {
            Authorization: Cookies.get("auth._token.local"),
          }
    }).then((res) =>
      this.tracks = res.data
    ).catch((err) => console.log(err));
  }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

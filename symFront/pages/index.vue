<template>
  <!-- <div id="app"> -->
    
      <div>
        <client-only>
          <!-- && likedTracks.length pour v-if -->
          <b-row v-if="tracks.length"> 
            <MusicComponent 
              v-for="(track, i) in tracks" :key="i" 
              :track="track" :username="track.User.username"
              :liked="isLiked(track.id)" />
          </b-row>
        </client-only>
      </div>
    
  <!-- </div> -->
</template>

<script>
import MusicComponent from "@/components/homepage/MusicComponent";
import { BContainer } from "bootstrap-vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  auth: false,
  components: {
    MusicComponent,
  },
  data() {
    return {
      tracks: [],
      likedTracks: []
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
    axios.get(process.env.apiUrl + "/track?fields=id,link,userId").then((res) =>
      this.tracks = res.data
    ).catch((err) => console.log(err));
    // const isLogin = this.$store.state.auth.loggedIn;
    // if (isLogin == true) {
    //   axios.get(process.env.apiUrl + "/user/getLikes", {
    //       headers: {
    //         Authorization: Cookies.get("auth._token.local"),
    //       },
    //     }).then((res) => {
    //       this.likedTracks = res.data
    //     })
    // }
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

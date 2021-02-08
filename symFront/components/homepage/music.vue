<template>
  <b-col lg="4" class="colonne">
    <b-card class="mt-3 songCard" no-body>
      <div class="aam_headerTrack">
        <small class="addBy text-muted">add by : {{ username }}</small>
        <span>Report</span>
      </div>
      <VideoComponent :song="track" class="videoComponent"/>
      <div class="trackInfo">
        <NameSongComponent :artist="artist" :song="track" />
        <SongControlComponent :liked="liked" :track='track'/>
      </div>
      
    </b-card>
  </b-col>
    <!-- <b-row class="justify-content-md-center mt-3 w-100">
      <b-col xs="12" sm="12" md="12" lg="12">
        <b-card no-body class="overflow-hidden" lg="4">
          <b-row no-gutters>
            <b-col md="4">
              <VideoComponent :song="track" />
            </b-col>
            <b-col md="8">
              <b-card-body style="text-align: left">
                <b-card-text>
                  <small class="text-muted">add by : {{ user.username }}</small>
                  <NameSongComponent :artist="artist" :song="track" />
                  <SongControlComponent :liked="liked" :track='track'/>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> -->
</template>

<script>
import NameSongComponent from "@/components/musicControl/name";
import SongControlComponent from "@/components/musicControl/control";
import VideoComponent from "@/components/musicControl/video";
import { BRow, BCard, BCol } from "bootstrap-vue";
import { mapState } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";



export default {
  props: {
    track: Object,
    liked: Boolean,
    username: String
  },
  name: 'MusiComponent',
  data() {
    return {
      artist: this.username,
      song: "",
      trackId: this.track.id,
      userId: this.track.UserId,
      // user: {
      //   username: this.track.User.username,
      // },
      likedTracks: []
    }
  },

  components: {
    NameSongComponent,
    SongControlComponent,
    VideoComponent
  },
  computed: {
  },
  methods: {
  },
  mounted() { 
   },
};
</script>

<style lang="scss" scoped>
.songCard{
  border-radius: 10px;
}
.trackInfo{
  padding: 10px 15px;
}
.addBy{
  padding: 10px 15px;
  font-size: 15px;
  color: #343434;
  letter-spacing: 0;
}
.aam_headerTrack{
  padding: 10px 0;
}
.aam_headerTrack > span{
  float: right;
  padding-right: 15px;
  color: #931D06;
}
</style>
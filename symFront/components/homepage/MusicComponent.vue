<template>
  <b-col lg="4" class="colonne">
    <b-card class="mt-3 songCard" no-body>
      <div class="aam_headerTrack">
        <small class="addBy text-muted">add by : {{ username }}</small>
        <span :class="'reportModal-' + trackId" v-if="this.$store.getters.isAuthenticated" @click="reportModal">Report</span>
      </div>
      <VideoComponent :song="track" class="videoComponent"/>
      <div class="trackInfo">
        <NameSongComponent :artist="artist" :song="track" />
        <SongControlComponent :liked="liked" :track='track'/>
      </div>
       <b-modal :id="'reportModal-' + trackId" hide-footer>
                <NameSongComponent :artist="artist" :song="track" />
                <ReportSong :track="track" @songReported="closeReport"/>
        </b-modal>
    </b-card>
  </b-col>
</template>

<script>
import NameSongComponent from "@/components/musicControl/MusicName";
import SongControlComponent from "@/components/musicControl/MusicControl";
import VideoComponent from "@/components/musicControl/MusicVideo"
import ReportSong from "@/components/form/ReportSong";
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
    VideoComponent,
    ReportSong
  },
  computed: {
  },
  methods: {
    reportModal() {
      console.log(this.trackId)
      this.$root.$emit("bv::show::modal", "reportModal-" + this.trackId, ".reportmodal-" + this.trackId);
    },
    closeReport() {
      console.log('Close modal')
      this.$root.$emit("bv::hide::modal", "reportModal-" + this.trackId);
    },
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
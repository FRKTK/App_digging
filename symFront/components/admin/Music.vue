<template>
    <b-row class="justify-content-md-center mt-3 w-100">
      <b-col xs="12" sm="12" md="12" lg="12">
        <b-card no-body class="overflow-hidden" lg="4">
          <b-row no-gutters>
            <b-col md="4">
              <VideoComponent :song="track" />
            </b-col>
            <b-col md="8">
              <b-card-body style="text-align: left">
                <b-card-text>
                  <small class="text-muted">add by : <nuxt-link :to="'/admin/user/' + track.userId"   >{{ user.username }} - userId: {{ track.userId }}</nuxt-link> - trackId : {{ track.id }}</small>
                  <NameSongComponent :artist="artist" :song="track" />
                  <SongControlComponent :track='track' :visible='track.visible'/>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
import NameSongComponent from "@/components/musicControl/MusicName";
import SongControlComponent from "@/components/admin/songControl/BasicControl";
import VideoComponent from "@/components/musicControl/MusicVideo";
import { BRow, BCard, BCol } from "bootstrap-vue";
import { mapState } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";



export default {
  props: {
    track: Object
  },
  name: 'MusiComponent',
  data() {
    return {
      artist: this.track.User.username,
      song: "",
      trackId: this.track.id,
      userId: this.track.UserId,
      user: {
        username: this.track.User.username,
      },
      likedTracks: []
    };
  },

  components: {
    NameSongComponent,
    SongControlComponent,
    VideoComponent,
    BRow, 
    BCard,
    BCol
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
</style>
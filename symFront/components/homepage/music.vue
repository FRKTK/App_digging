<template>
    <b-row class="justify-content-md-center mt-3 w-100">
      <b-col md="12">
        <b-card no-body class="overflow-hidden" lg="4">
          <b-row no-gutters>
            <b-col md="4">
              <b-card-img
                src="https://picsum.photos/200/200/?image=21"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
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
    </b-row>
</template>

<script>
import NameSongComponent from "@/components/musicControl/name";
import SongControlComponent from "@/components/musicControl/control";
import { BRow, BCard, BCol } from "bootstrap-vue";
import { mapState } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";



export default {
  props: {
    track: Object,
    liked: Boolean
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
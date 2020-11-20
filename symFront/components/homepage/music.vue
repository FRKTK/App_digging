<template>
  <div>
    <b-row class="justify-content-md-center mt-3">
      <b-col md="10">
        <b-card no-body class="overflow-hidden" lg="12">
          <b-row no-gutters>
            <b-col md="4">
              <b-card-img
                src="https://picsum.photos/400/400/?image=20"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="8">
              <b-card-body style="text-align: left">
                <b-card-text>
                  <small class="text-muted">add by : {{ user.username }}</small>
                  <NameSongComponent :artist="artist" :song="track" />
                  <SongControlComponent />
                  <SongStatComponent />
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NameSongComponent from "@/components/musicControl/name";
import SongControlComponent from "@/components/musicControl/control";
import SongStatComponent from "@/components/musicControl/stat";
import { BRow, BCard, BCol } from "bootstrap-vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  props: {
    tracks: {
      type: Object,
    },
  },
  data() {
    return {
      track: this.tracks.link,
      artist: this.tracks.User.username,
      song: "",
      userId: this.tracks.UserId,
      user: {
        username: this.tracks.User.username,
      },
    };
  },
  components: {
    NameSongComponent,
    SongControlComponent,
    SongStatComponent,
  },
};
</script>

<style lang="scss" scoped>
</style>
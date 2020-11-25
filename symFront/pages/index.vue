<template>
  <div id="app">
    <b-container class="main">
      <div>
        <client-only>
          <musicComponent v-for="(track, i) in tracks" :key="i" :tracks="track" />
        </client-only>
        
      </div>
    </b-container>
  </div>
</template>

<script>
import musicComponent from "@/components/homepage/music";
import { BContainer } from "bootstrap-vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  auth: false,
  components: {
    musicComponent,
  },
  data() {
    return {
      tracks: [],
    };
  },
  async fetch() {
    this.tracks = await fetch("http://localhost:4000/api/track").then((res) =>
      res.json()
    );
  },
  methods: {},
  mounted() {  },
};
</script>

<style>
#app{
  padding-top: 70px;
}
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

<template>
  <div id="app">
    <b-container>
      <div>
        <musicComponent v-for="(track, i) in tracks" :key="i" :tracks="track" />
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
  methods: {
    isLogin() {
      var token = Cookies.get("auth._token.local");
      console.log("isLogin methods : " + token.replace("Bearer", ""));
      return token;
    },
  },
  mounted() {},
};
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

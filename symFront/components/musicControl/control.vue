<template>
  <div class="controls">
    <b-button
      @click="like()"
      variant="success" name="up">
      <b-icon-heart-fill v-if="isLiked"></b-icon-heart-fill>
      <b-icon-heart v-else></b-icon-heart>

    </b-button>

    <b-button variant="light" name="other">
      <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
    </b-button>
  </div>
</template>

<script>
import {
  BIcon,
  BIconArrowUp,
  BIconArrowDown,
  BIconThreeDotsVertical,
  BIconHeart,
  BIconHeartFill,
} from "bootstrap-vue";

export default {
  name: 'SongController',
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconThreeDotsVertical,
    BIconHeart,
    BIconHeartFill,
  },
  model: {
    prop: "controler",
    event: "change",
  },
  props: {
    track:  {
      type: Object
    },
    // liked: {
    //   type: Boolean
    // }
  },
  data() {
    return {
      name: "",
      isLiked: '',
      trackId: this.track
    };
  },
  methods: {
    like() {
      // set like
      this.$axios.post(process.env.apiUrl + "/track/"+this.track.id+"/like/")
      .then((res) => {
        this.isLiked = res.data.liked ? true : false
      })
      .catch((err) => console.log(err));
      //get if liked after the action
      this.$axios.get(process.env.apiUrl + '/user/' + this.track.id + '/isLike/')
      .then((res) => this.isLiked = res.data)
    }
  },
  mounted() {
    const isLogin = this.$store.state.auth.loggedIn;
    if (isLogin) {
      this.$axios.get(process.env.apiUrl + '/user/' + this.track.id + '/isLike/')
    .then((res) => this.isLiked = res.data)
    }
    

  },
};
</script>

<style lang="scss" scoped>
</style>
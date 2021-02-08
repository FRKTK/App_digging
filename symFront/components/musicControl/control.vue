<template>
  <div class="controls" @click="like()">
    <b-button class="aam_likeBtn_liked" v-if="isLiked">
      <b-icon-heart-fill></b-icon-heart-fill>
      <span class="aam_likeBtn_span">In your heart</span>
    </b-button>
    <b-button class="aam_likeBtn" v-else>
      <b-icon-heart></b-icon-heart>
      <span class="aam_likeBtn_span">Like this</span>
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
.aam_likeBtn{
  width: 100%;
  background-color: #14038C;
  border: 3px solid #14038C;
  line-height: 0;
  padding: 10px 0;
  border-radius: 10px;
  vertical-align: middle;
}
.aam_likeBtn_liked{
  width: 100%;
  background-color: #fff;
  border: 3px solid #14038C;
  color: #14038C;
  line-height: 0;
  padding: 10px 0;
  border-radius: 10px;
  vertical-align: middle;
}
.aam_likeBtn_span{
  display: inline-block;
}
.b-icon.bi{
  vertical-align: middle!important;
}

</style>
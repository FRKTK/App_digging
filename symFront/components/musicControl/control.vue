<template>
  <div class="controls">
    <b-button variant="success" name="up" v-if="isSongLike(this.like) == true">
      <b-icon-heart-fill></b-icon-heart-fill>
    </b-button>
    <b-button variant="success" name="up" v-else>
      <b-icon-heart></b-icon-heart>
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
    controler: {
      type: String,
      require: true,
    },
    like: {
      type: Array
    },
    track: Number
  },
  data() {
    return {
      name: "",
      trackId: this.track
    };
  },
  methods: {
    isSongLike(likeArray){
      let i
      for(i in likeArray){
        let like = likeArray[i]
        let linkId = like.LinkId
        if(linkId == this.trackId){ 
          return true
        }        
      }
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>
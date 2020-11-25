<template>
  <div class="controls">
    <b-button variant="success" name="up">
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
  BIconHeartFill
} from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconThreeDotsVertical,
    BIconHeart,
    BIconHeartFill
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
    // like: {
    //   type: Function
    // }
  },
  data() {
    return {
      name: ""
    };
  },
  mounted() { 
    },
};
</script>

<style lang="scss" scoped>
</style>
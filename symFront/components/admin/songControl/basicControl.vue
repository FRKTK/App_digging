<template>
  <div class="controls">
    <b-button
      @click="like()"
      variant="danger" name="up">
      <b-icon-trash></b-icon-trash>

    </b-button>

  </div>
</template>

<script>
import {
  BIcon,
  BIconTrash,
} from "bootstrap-vue";

export default {
  name: 'SongController',
  components: {
    BIcon,
    BIconTrash,
  },
  model: {
    prop: "controler",
    event: "change",
  },
  props: {
    track:  {
      type: Object
    }
  },
  data() {
    return {
      name: "",
      trackId: this.track
    };
  },
  methods: {
    like() {
      this.$axios.delete(process.env.apiUrl + "/admin/tracks/delete/"+this.track.id)
      .then((res) =>{
        console.log(res)
      })
      .catch((err) => console.log(err));
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>
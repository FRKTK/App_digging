<template>
  <div class="controls">
    <b-button
      @click="delTrack()"
      variant="danger" name="up" v-if="track.visible == true">
      <b-icon-eye-slash-fill></b-icon-eye-slash-fill>
    </b-button>
    <b-button
      @click="addTrack()"
      variant="success" name="up" v-else>
      <b-icon-eye-fill></b-icon-eye-fill>
    </b-button>

  </div>
</template>

<script>
import {
  BIcon,
  BIconTrash,
  BIconEyeFill,
  BIconEyeSlashFill
} from "bootstrap-vue";

export default {
  name: 'SongController',
  components: {
    BIcon,
    BIconTrash,
    BIconEyeFill,
    BIconEyeSlashFill
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
    delTrack() {
      this.$axios.put(process.env.apiUrl + "/admin/tracks/delete/"+this.track.id)
      .then((res) =>{
        this.track.visible = false
      })
      .catch((err) => console.log(err));
    },
    addTrack() {
      this.$axios.put(process.env.apiUrl + "/admin/tracks/visible/"+this.track.id)
      .then((res) =>{
        this.track.visible = true
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
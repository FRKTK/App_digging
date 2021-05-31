<template>
  <div>
    <iframe
      :src="ytEmbedLink"
      width="100%"
      height="200"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "videoComponent",
  props: {
    track: Object,
  },
  computed: {
    ytEmbedLink() {
      var song = this.$attrs.song.link;
      return "http://www.youtube.com/embed/" + song;
    },
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
</style>
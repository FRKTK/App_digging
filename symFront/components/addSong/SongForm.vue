<template>
  <div>
    <b-form-group
      id="fieldset-1"
      label="Ajouter une vidéo Youtube :"
      label-for="input-1"
      valid-feedback="Thank you!"
    >
      <b-form-input id="input-1" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://youtu.be/dQw4w9WgXcQ" trim></b-form-input>
    </b-form-group>
    <styleTag />
  </div>
</template>

<script>
import styleTag from '@/components/addSong/styleTag'
import { BFormGroup, BFormInput, BBadge } from "bootstrap-vue"
export default {
  name: "SongForm",
  components: {
    BFormGroup, styleTag
  },
  data() {
    return {
      name: "SongForm",
    };
  },
  methods: {
  },
};
</script>



<style lang="scss" scoped>
</style>
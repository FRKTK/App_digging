<template>
  <div>
    <b-form-group
      id="fieldset-1"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-1"
      valid-feedback="Thank you!"
    >
      <b-form-input id="input-1" v-model="name" trim></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormInput } from "bootstrap-vue";
export default {
  name: "SongForm",
  components: {
    BFormGroup,
  },
  data() {
    return {
      name: "SongForm",
    };
  },
};
</script>



<style lang="scss" scoped>
</style>
<template>
  <form @submit="report">
    {{ track.id }}
    <b-form-select v-model="selected" :options="options"></b-form-select>

    <b-form-checkbox v-model="checked1" name="check-button" button>
      Button Checkbox <b>(Checked: )</b>
    </b-form-checkbox>
    <small
      >Chaque lien reporté est traité dans un bref délais. S'il n'enfrain
      aucunes règles, celui-ci réaparaitra dès lors qu'il aurat été traité par
      un administrateur.</small
    >
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    track: Object,
  },
  data() {
    return {
      title: "",
      selected: null,
      options: [
        { value: "1", text: "Ce n'est pas une musique" },
        { value: "2", text: "Déjà postés plusieurs fois" },
        { value: "3", text: "Contenu innaproprié" },
      ],
    };
  },
  methods: {
    async report(e) {
      e.preventDefault();
      if (this.selected <= 0) {
        console.log("champs vides");
      } else {
       await this.$axios
          .post(process.env.apiUrl + "/track/" + this.track.id + "/report/", {
            message: this.selected,
          })
          .then((res) => {
            if (res.status == 201) {
              this.$emit('songReported');
            } else {
              console.log(res);
            }
            // TODO: Success afficher quelque chose
          })
          .catch((err) => console.log(err));
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
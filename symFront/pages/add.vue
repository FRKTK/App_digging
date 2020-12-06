<template>
  <b-container tag="div" class="mt-5" fluid>
    <b-row class="justify-content-md-center mt-5">
        <b-col lg="6">
            <b-card header="Formulaire d'ajout">

                <songForm />
                
              <div>
                <b-badge variant="dark" class="ml-1"  v-for="(tagName, i) in tags" :key="i" :tagId="i">
                    {{ tagName }} <b-icon-x @click="remove(i)" :removeId="i"></b-icon-x> 
                </b-badge> 
              </div>
              <template #footer>
                <b-button variant="success" @click="addSong">Envoyer</b-button>
              </template>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card title="Prévisualisation">
                <preview />
            </b-card>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import preview from "@/components/addSong/preview";
import songForm from "@/components/addSong/songForm";
import { BCol, BContainer, BRow, BCard, BIconX, BButton } from 'bootstrap-vue';

export default {
  name: "AddSong",
  components: { preview, songForm, BCol, BContainer, BRow, BCard, BIconX  },
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    addSong(){
      this.$root.$emit('submitSong')
      console.log(this.tags)
    },
    remove(index){
        this.tags.splice(index, 1)
    }
  },
  mounted() {
    this.$root.$on('tagName', (res => this.tags.push(res)))
  },
};
</script>

<style lang="scss" scoped>
</style>
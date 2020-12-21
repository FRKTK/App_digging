<template>
  <b-container tag="div" class="mt-5" fluid>
    <b-row class="justify-content-md-center mt-5">
        <b-col lg="6">
            <b-card header="Formulaire d'ajout">

                <songForm @update="link = $event" />
                
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
              <iframe 
                :src="'http://www.youtube.com/embed/'+computedLink"
                    width="560" height="315" frameborder="0" allowfullscreen></iframe>
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
      link: ''
    };
  },
  methods: {
    addSong(){
      this.$root.$emit('submitSong')
      console.log(this.tags)
      console.log(this.link)
    },
    remove(index){
        this.tags.splice(index, 1)
    }
  },
  computed: {
    computedLink() {
      if(this.link.indexOf('?v=') > 1) {
          return this.link.substr(this.link.indexOf('?v=') + 3)
      } 
      if (this.link.lastIndexOf('/') > 1) {
        return this.link.substr(this.link.lastIndexOf('/'))
      }
      return false
    }
  },
  mounted() {
    this.$root.$on('tagName', (res => this.tags.push(res)))
    this.$root.$on('songLink', (res => this.link.push(res)))
  },
};
</script>

<style lang="scss" scoped>
</style>
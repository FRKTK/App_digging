<template>
  <b-container tag="div" class="mt-5" fluid>
    <b-row class="justify-content-md-center mt-5 w-100">
        <b-col lg="6">
            <b-card title="Card title">
                <songForm />

              <div>
                <b-badge variant="dark" class="ml-1"  v-for="(tagName, i) in tags" :key="i" :tagId="i">
                    {{ tagName }} <b-icon-x @click="remove(i)" :removeId="i"></b-icon-x> 
                </b-badge> 
              </div>
            </b-card>
        </b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-3 w-100">
        <b-col lg="6">
            <b-card title="Card title" sub-title="Card subtitle">
                <preview />
            </b-card>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import preview from "@/components/addSong/preview";
import songForm from "@/components/addSong/songForm";
import { BCol, BContainer, BRow, BCard, BIconX } from 'bootstrap-vue';

export default {
  name: "AddSong",
  components: { preview, songForm, BCol, BContainer, BRow, BCard, BIconX  },
  data() {
    return {
      tags: [],
    };
  },
  methods: {
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
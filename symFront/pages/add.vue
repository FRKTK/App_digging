<template>
  <b-container tag="div" class="mt-5" fluid>
    <b-row class="justify-content-md-center mt-5 w-100">
        <b-col lg="6">
            <b-card title="Card title" >
                <songForm />
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
//import preview from "@/components/addSong/preview";
import preview from "@/components/addSong/preview";
import songForm from "@/components/addSong/songForm";
import { BCol, BContainer, BRow, BCard } from 'bootstrap-vue';

export default {
  name: "AddSong",
  components: { preview, songForm },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
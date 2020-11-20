<template>
  <b-list-group horizontal>
    <b-list-group-item>
      <b-icon-arrow-up></b-icon-arrow-up> {{ up }}
    </b-list-group-item>
    <b-list-group-item>
      <b-icon-arrow-down></b-icon-arrow-down> {{down}}
    </b-list-group-item>
    <b-list-group-item>
        <b-icon-play-fill></b-icon-play-fill>{{play}}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { BIcon, BIconArrowUp, BIconArrowDown, BIconPlayFill, BListGroup, BListGroupItem } from 'bootstrap-vue'
export default {
    components: {
         BIcon,
        BIconArrowUp,
        BIconArrowDown,
        BIconPlayFill
    },
    props:{
        up: {
            type: Number,
            //require: true
        },
        down: {
            type: Number,
            //require: true
        },
        play: {
            type: Number,
            //require: true
        },
    }
};
</script>

<style lang="scss" scoped>
</style>
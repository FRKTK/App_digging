<template>
  <div class="controls">
    <b-button variant="success" name="up" @click="upCounter('up')">
      <b-icon-arrow-up></b-icon-arrow-up>
    </b-button>
    <b-button variant="danger" name="down" @click="upCounter('down')">
      <b-icon-arrow-down></b-icon-arrow-down>
    </b-button>
    <b-button variant="light" name="other" @click="upCounter('other')">
      <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
    </b-button>
  </div>
</template>

<script>
import { BIcon, BIconArrowUp, BIconArrowDown, BIconThreeDotsVertical } from 'bootstrap-vue'
export default {
    components: {
         BIcon,
        BIconArrowUp,
        BIconArrowDown,
        BIconThreeDotsVertical
    },
    model: {
        prop: 'controler',
        event: 'change'
    },
    props: {
        controler: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            name: '',
        }
    },
    methods: {
        upCounter(ctrl){
            this.$emit('btnMusicControl', ctrl)
            this.name = ctrl
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
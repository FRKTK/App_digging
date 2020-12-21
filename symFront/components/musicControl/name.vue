<template>
        <!-- <p>{{artist}} - {{song.link}}</p> -->
        <p>{{ title }}</p>
</template>

<script>
import axios from 'axios'
    export default {
        props:{
            artist: '',
            song: ''
        },
        data: function(){
            return {
                title: ''
            }
        },
        mounted() {
            axios.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + this.song.link).then((res) => this.title = res.data.title)
        },
        
    }
</script>

<style lang="scss" scoped>

</style>
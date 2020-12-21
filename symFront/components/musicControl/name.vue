<template>
    <div>
        <p>{{ title }}</p>
        <p>
            <b-badge variant="dark" class="ml-1"  v-for="(tagName, i) in tags" :key="i" :tagId="i">
                    {{ tagName }}
            </b-badge> 
        </p>
         
    </div>
        <!-- <p>{{artist}} - {{song.link}}</p> -->
        
</template>

<script>
import axios from 'axios'
import { BBadge } from 'bootstrap-vue';
    export default {
        props:{
            artist: '',
            song: ''
        },
        data: function(){
            return {
                title: '',
                tags: ''
            }
        },
        mounted() {
            axios.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + this.song.link).then((res) => this.title = res.data.title)
            axios.get(process.env.apiUrl + '/track/' + this.song.id + '/tags/').then((res) => this.tags = JSON.parse(res.data.tagName)) 
        },
        
    }
</script>

<style lang="scss" scoped>

</style>
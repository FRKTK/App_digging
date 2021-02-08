<template>
    <div>
        <div class="titleTrack">
            <p class="artistName">{{ fullTitle[0] }}</p>
            <p class="songName">{{ fullTitle[1] }}</p>
        </div>
        <div class="aam_classification">
            <b-badge class="ml-1 aam_badge"  v-for="(tagName, i) in tags" :key="i" :tagId="i">
                    {{ tagName }}
            </b-badge> 
        </div>
         
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
                artistName: '',
                songName: '',
                tags: ''
            }
        },
        computed: {
            fullTitle: function (){
                var fullTitle = this.title.split(' - ')
                this.artistName = fullTitle[0]
                this.songName = fullTitle[1]
                return [this.artistName, this.songName ]
            }
        },
        mounted() {
            axios.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + this.song.link).then((res) => this.title = res.data.title)
            axios.get(process.env.apiUrl + '/track/' + this.song.id + '/tags/').then((res) => this.tags = JSON.parse(res.data.tagName)) 
            var test = "artist - title"
        },
        
    }
</script>

<style lang="scss" scoped>
.titleTrack{
    color: #343434;
    text-align: center;
    font-size: 20px;
    margin-bottom: 0px;
}
.artistName{
    font-weight: 600;
    margin-bottom: -4px;
}
.songName{
    margin: 0;
}
.aam_badge{
    background-color: #fff;
    border: 1px solid #969DFE;
    color: #14038C;
    font-size: 15px;
    font-weight: 400;
}
.aam_classification{
    text-align: center;
    padding: 10px 0;
}
</style>
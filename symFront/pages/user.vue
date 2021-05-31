<template>
     <b-col lg="12" class="colonne">
      <b-card class="mt-3 songCard" no-body>
        <b-row>
            <b-col class="aam_headerTrack" lg="4">
              <h1>
                {{ username }}
              </h1>
              <p>{{ email }}</p>
              <b-button>Profile settings</b-button>
            </b-col>
            <b-col lg="4">
              <h2><span>{{ links.length }}</span> Songs shared</h2>
            </b-col>   
            <b-col lg="4">
              <h2><span>{{ likes.length }}</span> Songs liked</h2>
            </b-col>   
        </b-row>
      </b-card>
      <h2>Songs added</h2>
       <b-row class="userSongs"> 
            <MusicComponent 
              v-for="(link, i) in links" :key="i" 
              :track="link" :username="userInfo.username"
              :liked="isLiked(link.id)" />
        </b-row>
        <h2>Songs liked</h2>
       <b-row class="userSongs"> 
         
            <MusicComponent 
              v-for="(like, i) in likes" :key="i" 
              :track="like.Link" :username="userInfo.username"
              :liked="isLiked(like.Link.id)" />
        </b-row>
  </b-col>
</template>

<script>
import axios from 'axios'
import MusicComponent from "@/components/homepage/MusicComponent";

    export default {
        data() {
            return {
                email: this.$auth.user.email,
                username: this.$auth.user.username,
                userId: this.$auth.user.id,
                userInfo: '',
                links: '',
                likes: ''
            }
        },
        components: {
          MusicComponent
        },
        created() {
          this.$axios.get(process.env.apiUrl + '/user/me/')
          .then((res) => {
            this.userInfo = res.data,
            this.links = res.data.Links,
            this.likes = res.data.Likes
          })
          
        },
        methods: {
          isLiked(id)  {
            if(this.likes.length) {
              return Object.values(this.likes).find(t => t.LinkId == id) ? true : false
            }
            return false
          }
        },
        mounted() {
          if(!this.$store.getters.isAuthenticated){
            this.$router.replace('/')
          }
          
        },
    }
</script>

<style lang="scss" scoped>
.songCard{
  padding: 15px;
  margin-bottom: 50px;
}
h2{
  vertical-align: middle;
}
h2 > span{
  font-size: 2em;
  font-weight: 600;
}
.userSongs{
  margin-bottom: 50px;
}
</style>
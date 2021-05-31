<template>
    <div>
        <b-row>
            <b-col cols="8">
                <p>Username: {{ user.username }} - #{{ user.id }}</p>
                <p>email: {{ user.email }}</p>
                <p>Compte créé le: {{ new Date(user.createdAt) }}</p>
            </b-col>
            <b-col cols="4">
                <div v-if="!user.deleted">
                    <b-button @click="deleteUser">Delete</b-button>
                </div>
                <div v-else>
                    <b-button @click="activeUser">Active</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row v-if="user.Likes">
            <b-col>
                <p>Likes :</p>
                <pre>{{ user.Likes }}</pre>
            </b-col>
        </b-row>
        <b-row v-if="user.Links">
            <b-col>
                <p>Links:</p>
                <pre>{{ user.Links }}</pre>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
    auth: true,
    layout: 'admin',
    components: {

    },
    props:{
        // userInfo: ''
    },
    data() {
        return {
            user: []
        }
    },
    computed: {
        userInfo () {
            return this.user.userInfoFound
        }
    },
    methods: {
        deleteUser () {
            const userId = this.user.id
            this.$axios.put(process.env.apiUrl + '/admin/users/delete/' + userId)
            .then(res => {
                if (res.status == 201) {
                    this.getUserInfo()
                    return 'User deleted'
                } else {
                    return 'User not deleted'
                }
            })
            .catch(err => console.log(err))
        },
        activeUser () {
            const userId = this.user.id
            this.$axios.put(process.env.apiUrl + '/admin/users/active/' + userId)
            .then(res => {
                if (res.status == 201) {
                    this.getUserInfo()
                    return 'User activated'
                } else {
                    return 'User not activated'
                }
            })
            .catch(err => console.log(err))
        },
        getUserInfo () {
            this.$axios.get(process.env.apiUrl + '/admin/users/info/' + this.$route.params.id)
            .then((res) => this.user = res.data.userInfoFound)
            .catch((err) => console.log(err))
        }
    },
    created() {
        
    },
    beforeMount() {
        this.getUserInfo()
    },
    mounted() {
    },
    }
</script>

<style lang="scss" scoped>

</style>
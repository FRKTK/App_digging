<template>
    <div>
        <b-row class="justify-content-md-center mt-3 w-100">
        <b-col xs="12" sm="12" md="12" lg="12">
            <b-card class="overflow-hidden">
                <b-card-body style="text-align: center">
                    <b-card-text>
                        <b>
                            <nuxt-link :to="'/admin/user/' + user.id" :user="user" @click="chargeData(user.id)">
                                {{ user.username }}
                            </nuxt-link>
                        </b>
                    </b-card-text>
                </b-card-body>
            </b-card>
        </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'UsersInfos',
        props:{
            user: Object
        },
        data() {
            return {
                userInfo: ''
            }
        },
        methods: {
            chargeData(id){
                $axios.get(
                process.env.apiUrl + '/admin/users/info/' + this.user.id
                ).then((res) => this.user = res.data)
            }
        },
        mounted() {
        },
        // asyncData() {
        //     return $axios.get(
        //     process.env.apiUrl + '/admin/users/info/' + this.user.id
        //     ).then((res) => this.user = res.data)
        // }
       
    }
</script>

<style lang="scss" scoped>

</style>
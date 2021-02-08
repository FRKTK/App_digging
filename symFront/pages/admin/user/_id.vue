<template>
    <div>
        <pre>{{ userInfo }}</pre>
        
    </div>
</template>

<script>

    import adminLayout from "@/layouts/admin";
    import { BContainer } from "bootstrap-vue";
    import Cookies from "js-cookie";

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
            userInfo: ''
        }
    },
     mounted() {
         this.$axios.get(process.env.apiUrl + '/admin/users/info/' + this.$route.params.id)
         .then((res) => this.userInfo = res.data)
         .catch((err) => console.log(err))
        // console.log(this.user)
        },
    }
</script>

<style lang="scss" scoped>

</style>
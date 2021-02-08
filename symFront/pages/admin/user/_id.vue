<template>
    <div>
        {{ user }}
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
        user: Object
    },
    data() {
        return {

        }
    },
     mounted() {
        //  this.$axios.get(process.env.apiUrl + '/admin/users/info/' + this.$route.params.id)
        //  .then((res) => this.user = res.data)
        //  .catch((err) => console.log(err))
        },
    }
</script>

<style lang="scss" scoped>

</style>
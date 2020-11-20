<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Share Your Music</b-navbar-brand>
                <b-navbar-nav>
                    <b-nav-item href="#"><nuxt-link to="/">Home</nuxt-link></b-nav-item>
                    <b-nav-item href="#"><nuxt-link to="/login" v-if="!this.$store.getters.isAuthenticated">Log In</nuxt-link><nuxt-link to="/user" v-else>My Profile</nuxt-link></b-nav-item>
                    <span v-if="this.$store.getters.isAdmin == 1">
                        <b-nav-item href="#"><nuxt-link to="/admin">Adminastration</nuxt-link></b-nav-item>
                    </span>
                    <span v-else-if="this.$store.getters.isAdmin == null"></span>
                </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default { 
    mounted() {
        console.log(this.$store.getters)
    },
}
</script>

<style scoped>

</style>
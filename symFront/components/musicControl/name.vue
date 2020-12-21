<template>
        <p>{{artist}} - {{song.link}}</p>
</template>

<script>
    export default {
        props:{
            artist: '',
            song: ''
        },
        mounted() {
        },
    }
</script>

<style lang="scss" scoped>

</style>
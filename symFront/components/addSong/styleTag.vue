<template>
    <div>
        <b-badge variant="dark">{{ tagName }} <b-icon-x></b-icon-x> </b-badge> 
        
    </div>
</template>

<script>
    import { BBadge, BButton, BIconX } from 'bootstrap-vue'
    export default {
        name: 'styleTag',
        props: [ 'tagName' ],
        components: {
            BBadge, BButton, BIconX
        },
        data() {
            return {
                name: ''
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
<template>
    <div class="mt-12">
                <div>
                    <ul v-if="users && users.length">
                        <li v-for="user of users">
                            <p>{{user.username}}</p>
                        </li>
                    </ul>
                    <ul v-if="errors && errors.length">
                        <li v-for="error of errors">
                            {{error.message}}
                        </li>
                    </ul>
                </div>            
    </div>
</template>

<script>
import axios from '@nuxtjs/axios';

    export default {
        async asyncData(context) {
            let response = await context.$axios.get('http://localhost:4000/api/users/all');
            console.log(response);

            return {};
        },
    }
</script>

<style scoped>

</style>
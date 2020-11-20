<template>
    <div>
        <b-form>
            <b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="We'll never share your email with anyone else.">
                <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Username:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="username"
                type="email"
                required
                placeholder="Choose your username"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="password"
                type="password"
                required
                placeholder="Choose your password"
                ></b-form-input>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>
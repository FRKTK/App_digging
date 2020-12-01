<template>
    <div>
        <b-form-group
        id="fieldset-1"
        label="Genre :"
        label-for="input-1"
        valid-feedback="Thank you!"
        >
            <b-form-input id="input-2" placeholder="Rock, Techno..." v-model="tag" @keyup.enter="addTag" trim></b-form-input>
        </b-form-group>
        
    </div>
</template>

<script>
    import { BBadge, BButton, BIconX, BFormInput, BFormGroup } from 'bootstrap-vue'
    export default {
        name: 'styleTag',
        props: [ '' ],
        components: {
            BBadge, BButton, BIconX, BFormInput, BFormGroup
        },
        data() {
            return {
                name: '',
                tags: [],
                tag: '',
                tagName: '',
            }
        },
        methods: {
            addTag(event){
                if(this.tag){
                    //this.tags.push(this.tag)
                    this.$root.$emit('tagName', this.tag)
                    this.tag = ''
                }else{
                    console.log('marche pas')
                }
                
            },
            remove(index){
                var tag = this.tags[index]
                console.log(index, tag)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
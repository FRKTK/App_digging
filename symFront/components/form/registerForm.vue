<template>
  <div>
    <b-form @submit='register'>
      <b-form-group label="Email address:" label-for="registerEmail">
        <b-form-input
          id="registerEmail"
          type="email"
          v-model="email"  
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Your Name:" label-for="registerUsername">
        <b-form-input
          id="registerUsername"
           v-model="username" 
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Choose password:" label-for="registerPwd">
        <b-form-input
          id="registerPwd"
          type="password"
          v-model="pwd" 
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Choose password:" label-for="registerPwd2">
        <b-form-input
          id="registerPwd2"
          type="password"
          v-model="pwd2" 
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormInput } from "bootstrap-vue";
import axios from "axios";

export default {
  data() {
    return {
        email: this.email,
        username: this.username,
        pwd: this.pwd,
        pwd2: this.pwd2
    };
  },
  methods: {
    async register(e) {
        e.preventDefault();
        console.log(this.email, this.username, this.pwd, this.pwd2)
        console.log(this.verifForm(this.email, this.username, this.pwd, this.pwd2))
        var validForm = this.verifForm(this.email, this.username, this.pwd, this.pwd2)

        if(validForm == true){
            var registerUser = await axios.post('http://localhost:4000/api/user/register', {email: this.email, username: this.username, password: this.pwd})
            .then((res) => {
                if(res.status == '201'){
                    this.$router.replace('/login')
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    verifForm(email, username, pwd, pwd2){
        // verification du formulaire
        var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        var PSWD_REGEX = /^(?=.*\d).{4,12}$/

        if(email == null || username == null || pwd == null){
            return false
        }else if(username.length < 3 || username.length > 14){
            return false
        }else if(!EMAIL_REGEX.test(email)){
            return false
        }else if(!PSWD_REGEX.test(pwd2)){
            return false
        }else if(pwd != pwd2){
            return false
        }else{
            return true
        }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
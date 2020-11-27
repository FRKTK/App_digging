<template>
  <client-only>
    <b-navbar toggleable="lg" tag="nav" fixed="top">
      <b-navbar-nav tag="ul">
        <b-nav-item>
          <nuxt-link to="/">Home</nuxt-link>
        </b-nav-item>
        <b-nav-item>
          <nuxt-link to="/add" v-if="this.$store.getters.isAuthenticated">Ajouter une musique</nuxt-link>
        </b-nav-item>
        <b-nav-item v-if="this.$store.getters.isAdmin == 1">
          <nuxt-link to="/admin">Administration</nuxt-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav tag="ul" class="ml-auto">
          <b-button
            id="loginButton"
            variant="light"
            @click="showModal"
            v-if="!this.$store.getters.isAuthenticated"
            >Log in</b-button>
            
        <b-nav-item-dropdown right v-else>
          <!-- Using 'button-content' slot -->
            <template #button-content variant="light">
                <b-avatar variant="light" class="mr-2"><b>T</b></b-avatar>
            </template>
            <b-dropdown-item><nuxt-link to="/user" >My Profile</nuxt-link></b-dropdown-item>
            <b-dropdown-item>Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-modal id="loginModal" hide-footer>
                <loginForm @successLogin="closeModal" />
        </b-modal>
      </b-navbar-nav>
    </b-navbar>
  </client-only>
</template>

<script>
import { BNavbar, BNavItem, BAvatar } from "bootstrap-vue";
import loginForm from "@/components/form/loginForm";

export default {
  name: "login",
  components: {
    loginForm,
  },

  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "loginModal", "#loginButton");
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "loginModal");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #1b4f72;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);

  a {
    color: #ebf5fb;
    font-weight: 700;
  }

  span.userIcon{
      color: white;
      font-weight: 700;
      background: red;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      border: 2px solid white
  }
}
</style>
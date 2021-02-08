<template>
  <b-container fluid class="main">
    <div>
      <b-row>
        <b-col lg="12">
            <b-list-group>
                <UsersInfos v-for="(user, i) in users" :key="i" :user="user" />
            </b-list-group>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import UsersInfos from "@/components/admin/UsersInfos";
import adminLayout from "@/layouts/admin";
import { BContainer } from "bootstrap-vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  auth: true,
  layout: "admin",
  components: {
    UsersInfos,
  },
  data() {
    return {
      users: "",
    };
  },
  mounted() {
    this.$axios
      .get(process.env.apiUrl + "/admin/users")
      .then((res) => (this.users = res.data));
  },
};
</script>

<style lang="scss" scoped>
</style>
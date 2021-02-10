<template>
    <b-list-group-item class="user" v-if="user.deleted == false">
      <nuxt-link
        :to="'/admin/user/' + user.id"        
      >
        {{ user.username }}
      </nuxt-link>
    </b-list-group-item>

    <b-list-group-item class="user deleted" v-else>
      <nuxt-link
        :to="'/admin/user/' + user.id"        
      >
        {{ user.username }}
      </nuxt-link>
      <b-badge variant="danger" class="deleted" pill>deleted</b-badge>
    </b-list-group-item>
</template>

<script>
export default {
  name: "UsersInfos",
  props: {
    user: Object,
  },
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    // chargeData: function (id) {
    //     console.log('Charge data : user/' + id)
    //     this.$axios
    //         .get(process.env.apiUrl + "/admin/users/info/" + id)
    //         .then((res) => this.userInfo = res.data.userInfoFound);
    // },
  },
  mounted() {

  },
  // asyncData() {
  //     return $axios.get(
  //     process.env.apiUrl + '/admin/users/info/' + this.user.id
  //     ).then((res) => this.user = res.data)
  // }
};
</script>

<style lang="scss" scoped>
.user{
    text-align: left;
}
.deleted{
    border: 1px solid red;
}
</style>
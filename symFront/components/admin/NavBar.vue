<template>
  <!-- <NavBar /> -->
    <div>
    <b-sidebar id="sidebar-no-header" visible no-header shadow no-close-on-route-change>
      <template>
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Administration</h4>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item>
                <nuxt-link to="/admin">Dashboard</nuxt-link> 
              </b-nav-item>
              <b-nav-item>
                <nuxt-link to="/admin/users">Users</nuxt-link> 
              </b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" href="/" block>Close Administration</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { SidebarPlugin } from "bootstrap-vue";

export default {
}
</script>

<style scoped>

</style>
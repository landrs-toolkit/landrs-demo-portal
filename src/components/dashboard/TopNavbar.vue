<template>
  <div class="m-0 t-0 border-bottom border-bottom-dark">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item @click="toggleSidebar()">
          <i class="fas tw-text-2xl" :class="{'fa-bars': !sidebar, 'fa-angle-double-left': sidebar, }"></i>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-brand :to="{name: 'home'}" href="#" class="tw-ml-3">CRC BVCC</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item>About</b-nav-item>
          <b-nav-item :to="{name: 'dashboard'}" active="true">Data Portal</b-nav-item>
        </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right no-caret="true">
          <template slot="button-content">
            <i class="fas fa-user-circle tw-text-2xl"></i>
          </template>
          <b-dropdown-item :to="{name: 'user'}">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState(["sidebar"])
  },
  methods: {
    ...mapActions([
      "setBaseComponent",
      "clearAuthorizationToken",
      "toggleSidebar"
    ]),
    ...mapActions("user", ["setUser"]),
    goTo(route) {
      this.$router.push(route);
    },
    toggle: function() {
      this.drawer = !this.drawer;
    },
    logout: function() {
      this.clearAuthorizationToken();
      this.setUser({});

      this.$notify({
        text: "You have been logged out",
        duration: 10000,
        type: "warn"
      });

      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style>
</style>

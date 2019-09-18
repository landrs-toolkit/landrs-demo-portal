<template>
  <div class>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">CRC BVCC</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name: 'dashboard'}">Dashboard</b-nav-item>
            <b-nav-item :to="{name: 'dashboard'}">About</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right no-caret="true"><template slot="button-content"><i class="fas fa-user-circle"></i></template>
              <b-dropdown-item
                :to="{name: 'login', query: { next: '/dashboard'}}"
                v-if="!user.email"
                >Sign In</b-dropdown-item>
              <b-dropdown-item :to="{name: 'register'}" v-if="!user.email">
                  Sign Up
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"])
  },
  methods: {
    toggle: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
</style>
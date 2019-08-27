<template>
    <div class="mt-1 mb-5">
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item :to="{name: 'home'}">CRC BVCC</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{name: 'dashboard'}">
                    <i class="fas fa-th-large"></i>
                    Dashboard
                </b-nav-item>
                <b-nav-item>|</b-nav-item>
                <b-nav-item :to="{name: 'user'}">
                    <i class="fas fa-user"></i>
                    Profile
                </b-nav-item>
                <b-nav-item>|</b-nav-item>
                <b-nav-item :to="{name: 'login', query: { next: '/dashboard'}}" v-if="!user.email">
                    <i class="fas fa-key"></i>
                    Sign In
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>

</template>

<script>
    import {
        mapState
    } from 'vuex';

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState('user', ['user'])
        },
        methods: {
            toggle: function () {
                this.drawer = !this.drawer;
            }
        }
    }
</script>

<style>

</style>
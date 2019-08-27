<template>
    <div class="m-0 t-0">
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-btn squared variant="outline-light" @click="toggleSidebar()">
                    <i class="fas fa-2x" :class="{'fa-bars': !sidebar, 'fa-times': sidebar, }"></i>
                </b-btn>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item @click="logout()">
                    <i class="fas fa-times"></i>
                    Sign Out
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        data() {
            return {
                drawer: true,
            }
        },
        computed: {
            ...mapState('user', ['user']),
            ...mapState(['sidebar'])
        },
        methods: {
            ...mapActions([
                'setBaseComponent',
                'clearAuthorizationToken',
                'toggleSidebar'
            ]),
            ...mapActions('user', [
                'setUser'
            ]),
            goTo(route) {
                this.$router.push(route);
            },
            toggle: function () {
                this.drawer = !this.drawer;
            },
            logout: function () {
                this.clearAuthorizationToken();
                this.setUser({});

                this.$notify({
                    text: 'You have been logged out',
                    duration: 10000,
                    type: 'warn'
                });

                this.$router.push({
                    name: 'home'
                });
            }
        }
    }
</script>

<style>

</style>

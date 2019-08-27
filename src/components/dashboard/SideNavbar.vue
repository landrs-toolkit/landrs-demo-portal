<template>

    <div>
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'home'}">
                        <i class="fas fa-home"></i>
                        Home
                    </b-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'dashboard'}">
                        <i class="fas fa-th-large"></i>
                        Dashboard
                    </b-link>
                </li>
            </ul>
            <hr>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'user'}">
                        <i class="fas fa-user"></i>
                        Profile
                    </b-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" @click="logout()">
                        <i class="fas fa-times"></i>
                        Sign Out
                    </b-link>
                </li>
            </ul>
        </div>
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
            ...mapState('user', ['user'])
        },
        methods: {
            ...mapActions([
                'setBaseComponent',
                'clearAuthorizationToken'
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

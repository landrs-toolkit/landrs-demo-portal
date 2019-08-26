<template>

    <div>
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'home'}">
                        <span data-feather="home"></span>
                        Home <span class="sr-only">(current)</span>
                    </b-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'dashboard'}">
                        <span data-feather="home"></span>
                        Dashboard <span class="sr-only">(current)</span>
                    </b-link>
                </li>
            </ul>
            <hr>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'user'}">
                        <span data-feather="home"></span>
                        Profile
                    </b-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" @click="logout()">
                        <span data-feather="home"></span>
                        Sign Out
                    </b-link>
                </li>
            </ul>
        </div>
    </div>

    <!-- <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item @click="goTo({name: 'home'})">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goTo({name: 'dashboard'})">
                    <v-list-item-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goTo({name: 'user'})">
                    <v-list-item-action>
                        <v-icon>person</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-spacer></v-spacer>
                <v-list-item @click="logout()">
                    <v-list-item-action>
                        <v-icon>close</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                <v-icon large>menu</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title>VCCs</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        <v-icon left>person</v-icon>
                        <span>{{user.name || user.email}}</span>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="goTo({name: 'user'})">
                        <v-list-item-title>{{user.name || user.email}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout()">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>
    </div> -->
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

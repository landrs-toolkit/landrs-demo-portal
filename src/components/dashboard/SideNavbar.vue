<template>

    <!-- <div class="h-100 sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'dashboard'}">
                        <b-img src="../../assets/crc-logo-full.png" fluid alt="logo"></b-img>
                    </b-link>
                </li>
            </ul>
            <hr>
           <ul class="nav flex-column">
               <li class="nav-item">
                    <b-dropdown-header class="sidebar-heading pl-3">
                        <i class="fas fa-user"></i>
                        Account
                    </b-dropdown-header>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'user'}">
                        Profile
                    </b-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'change-password'}">
                        Change Password
                    </b-link>
                </li>
            </ul>
        </div>
    </div> -->

    <div class="h-100 sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'dashboard'}">
                        <b-img src="../../assets/crc-logo-full.png" fluid alt="logo"></b-img>
                    </b-link>
                </li>
            </ul>
            <hr>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-dropdown-header class="sidebar-heading">
                        <i class="fas fa-th-large"></i>
                        Dashboard
                    </b-dropdown-header>
                </li>

                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'dashboard'}" exact>
                        Main
                    </b-link>
                </li>
            </ul>
            <hr>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-dropdown-header class="sidebar-heading">
                        <i class="fas fa-user"></i>
                        User
                    </b-dropdown-header>
                </li>
                
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'user'}">
                        Profile
                    </b-link>
                </li>
            </ul>
            <hr>

            <ul class="nav flex-column" v-if="user.is_staff">
                <li class="nav-item">
                    <b-dropdown-header class="sidebar-heading">
                        <i class="fas fa-users"></i>
                        Manage
                    </b-dropdown-header>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'users'}">
                        Users
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
    .sidebar {
        background-color: white;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        padding-top: 15px;
    }
    .sidebar .nav-link {
        font-size: .9rem;
        font-weight: 400;
        color: #666;
        line-height: 1.3;
        outline: 0;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
    }

    .sidebar .nav-link.router-link-active {
        color: #333;/* #007bff; */
        font-weight: 500;
        background:rgba(0, 0, 0, .075);
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    .sidebar-heading {
        font-size: .9rem;
        text-transform: uppercase;
        color: #333;
        font-weight: 600;
    }
</style>

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

    <div class="d-inline-flex sidebar" :class="{'collapsed': !sidebar}">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <b-link class="nav-link" :to="{name: 'home'}">
                        <b-img src="../../assets/crc-logo-full.png" fluid alt="logo"></b-img>
                    </b-link>
                </li>
            </ul>
            <br>
            
            <div v-for="(section, section_index) in menu" :key="section.title">
                <ul class="nav flex-column" v-if="true">
                <li class="nav-item">
                    <b-dropdown-header class="sidebar-heading">
                        <i class="fas" :class="[section.icon]" v-if="section.icon"></i>
                        {{section.title}}
                    </b-dropdown-header>
                </li>
                <li class="nav-item" v-for="link in section.links" :key="link.title">
                    <b-link class="nav-link" :to="{name: link.name}">
                        {{link.title}}
                    </b-link>
                </li>
            </ul>

                <hr v-if="section_index < (menu.length - 1)">
            </div>

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
                menu: [
                    {
                        title: 'Dashboard',
                        icon: 'fa-th-large',
                        collapsible: true,
                        links: [
                            {title: 'Main', name: 'dashboard', params: {}, query: {}}
                        ]
                    },
                    {
                        title: 'Examples',
                        icon: 'fa-th-large',
                        collapsible: true,
                        links: [
                            {title: 'Components', name: 'components', params: {}, query: {}},
                            {title: 'Map', name: 'map', params: {}, query: {}},
                            {title: 'Charts', name: 'charts', params: {}, query: {}}
                        ]
                    },
                    {
                        title: 'User',
                        icon: 'fa-user',
                        collapsible: true,
                        links: [
                            {title: 'Profile', name: 'user', params: {}, query: {}}
                        ]
                    },
                    {
                        title: 'Manage',
                        icon: 'fa-users',
                        collapsible: false,
                        links: [
                            {title: 'Users', name: 'users', params: {}, query: {}}
                        ]
                    }
                ]
            }
        },
        computed: {
            ...mapState('user', ['user']),
            ...mapState(['sidebar'])
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
        /* width: 250px;
        max-width: 250px; */
        min-width: 250px;
        max-width: 250px;
        background-color: white;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        padding-top: 15px;
        transition: all 0.6s cubic-bezier(0.945, 0.020, 0.270, 0.665);
        transform-origin: bottom left;
    }
    .sidebar.collapsed {
        min-width: 50px;
        max-width: 50px;
        /* transform: rotateY(100deg); */
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

<template>
    <v-layout justify-center>
        <v-dialog v-model="loginDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
            </template>
            <!-- <v-card>
                <v-card-title>
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Email*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card> -->

            <v-alert :value="alert" type="error">
                Could not log you in!
            </v-alert>

            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person" v-model="payload.username" id="identity" name="identity"
                            label="Identity" type="text"></v-text-field>
                        <v-text-field prepend-icon="lock" v-model="payload.password" name="password" label="Password"
                            id="password" type="password" @keypress.enter="login()"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login()">Login</v-btn>
                    <v-btn color="warning" @click="cancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>


        </v-dialog>
    </v-layout>
</template>

<script>
    import {
        HTTP
    } from '@/utilities/http-common';

    import {
        mapGetters,
        mapActions,
        mapState
    } from 'vuex';

    export default {
        props: {
            next: {
                type: String,
                default: ''
            }
        },
        data: () => ({
            payload: {
                username: '',
                password: '',
                grant_type: process.env.VUE_APP_GRANT_TYPE,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET
            },
            dialog: true,
            alert: false
        }),
        computed: {
            ...mapState('dialog', ['loginDialog']),
            ...mapGetters([
                'getAuthorizationToken',
                'getAuthorizationHeader',
                'hasAuthorizationToken'
            ])
        },
        methods: {
            ...mapActions(['setAuthorizationToken', 'setBaseComponent']),
            ...mapActions('dialog', ['hideLoginDialog']),
            ...mapActions('alert', ['setSuccess', 'setError']),
            ...mapActions('user', ['setUser', 'getUser']),
            login: function () {
                let that = this;
                that.alert = false;

                if (!that.$data.payload.username.trim() || !that.$data.payload.password.trim()) {
                    that.alert = true;
                    return;
                }
                
                // Attempt a login
                HTTP.post('/users/api/token/', that.$data.payload).then(response => {
                    // Set token, updated HTTP with the Authorization token and set the base component to the 'Back' template.
                    that.setAuthorizationToken(response.data);
                    HTTP.defaults.headers.common['Authorization'] = that.getAuthorizationHeader.Authorization;
                    
                    that.$notify({
                        text: 'You have been logged in',
                        duration: 10000,
                        type: 'success'
                    });

                    // HTTP.defaults.headers.common['Authorization'] = 'test';
                    that.getUser().then(res => {
                        that.setUser(res.data);
                    }).catch(() => {
                    }).finally(() => {
                        that.hide();

                        // Navigate to next if set, otherwise, go to user page.
                        if (that.$route.query.next) {
                            that.$router.push({path: that.$route.query.next});
                        }
                    });
                }).catch(() => {
                    that.alert = true;
                    that.payload.password = "";
                });
            },
            hide: function () {
                this.payload.username = "";
                this.payload.password = "";
                this.alert = false;
                this.hideLoginDialog()
            },
            cancel: function () {
                this.hide();

                this.$router.push({
                    name: 'home'
                });
            }
        }
    }
</script>
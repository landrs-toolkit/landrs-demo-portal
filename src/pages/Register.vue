<template>
    <b-container fluid class="h-100 bg-danger">
        <div class="h-25"></div>
        <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input size="lg" v-model="form.name" placeholder="Name"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="6" md="3" offset-md="3">
                <b-form-input size="lg" v-model="form.email" placeholder="Email"></b-form-input>
            </b-col>
            <b-col sm="6" md="3">
                <b-form-input size="lg" v-model="form.username" placeholder="Username"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="6" md="3" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.password" placeholder="Password"></b-form-input>
            </b-col>
            <b-col sm="6" md="3">
                <b-form-input type="password" size="lg" v-model="form.confirm_password" placeholder="Confirm Password"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="6" md="3" offset-md="3">
                <b-button class="mt-2" variant="primary" block size="lg" @click="register()">Sign Up</b-button>
            </b-col>
            <b-col sm="6" md="3">
                <b-button class="mt-2" variant="warning" block size="lg" @click="cancel()">Cancel</b-button>
            </b-col>
        </b-row>

    </b-container>
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
            form: {
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
            register: function () {
                let that = this;
                that.alert = false;

                if (!that.$data.form.username.trim() || !that.$data.form.password.trim()) {
                    return;
                }

                // Attempt a login
                HTTP.post('/users/api/token/', that.$data.form).then(response => {
                    // Set token, updated HTTP with the Authorization token and set the base component to the 'Back' template.
                    that.setAuthorizationToken(response.data);

                    that.$notify({
                        text: 'You have been logged in',
                        duration: 10000,
                        type: 'success'
                    });

                    // HTTP.defaults.headers.common['Authorization'] = 'test';
                    that.getUser().then(res => {
                        that.setUser(res.data);
                    }).catch(() => {}).finally(() => {
                        that.hide();

                        // Navigate to next if set, otherwise, go to user page.
                        if (that.$route.query.next) {
                            that.$router.push({
                                path: that.$route.query.next
                            });
                        } else {
                            that.$router.go(); // Reload the page.
                        }
                    });
                }).catch(() => {
                    that.alert = true;
                });
            },
            cancel: function () {
                this.$router.push({
                    name: 'home'
                });
            }
        }
    }
</script>
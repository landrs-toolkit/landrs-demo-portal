<template>
    <b-container fluid class="h-100 bg-danger">
        <div class="h-25"></div>
        <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="email" size="lg" v-model="form.email" placeholder="Email"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="6" md="3" offset-md="3">
                <b-button class="mt-2" variant="primary" block size="lg" @click="sendEmail()">Send Email</b-button>
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
        mapState
    } from 'vuex';

    import store from '@/store/store';

    export default {
        beforeRouteEnter(to, from, next) {
            if(store.getters.isAuthenticated) {
                next({name: 'dashboard'});
            } else {
                next();
            }
            next();
        },
        data: () => ({
            form: {
                email: ''
            }
        }),
        computed: {
            ...mapState(['user']),
        },
        methods: {
            sendEmail: function () {
                let that = this;
                
                if (!that.$data.form.email.trim()) {
                    that.$notify({
                        text: 'Please enter valid email.',
                        duration: 10000,
                        type: 'success'
                    });

                    return;
                }

                // Send forgot password email.
                HTTP.post('/users/api/sign-up/', that.$data.form).then(response => {
                    
                }).catch(() => {
                    that.$notify({
                        text: 'Account with email not found.',
                        duration: 10000,
                        type: 'success'
                    });
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
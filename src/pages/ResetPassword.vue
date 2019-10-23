<template>
    <b-container fluid class="h-100">
        <div class="h-25"></div>

        <!-- <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.password" placeholder="Password"></b-form-input>
            </b-col>
        </b-row> -->

        <b-row class="my-3">
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.new_password1" placeholder="New Password">
                </b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-3">
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.new_password2"
                    placeholder="Confirm Password"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="my-3">
            <b-col sm="6" md="3" offset-md="3">
                <b-button class="mt-2" variant="primary" block size="lg" @click="changePassword()">Change</b-button>
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

    import DashboardBaseTemplate from '@/layouts/DashboardBaseTemplate.vue'

    export default {
        mixins: [DashboardBaseTemplate],
        data: () => ({
            form: {
                // password: '',
                new_password1: '',
                new_password2: '',
                uid: '',
                token: ''
            }
        }),
        methods: {
            changePassword: function () {
                let that = this;

                // if (!that.$data.form.password.trim()) {
                //         that.$notify({
                //         text: 'Please enter your current password.',
                //         duration: 10000,
                //         type: 'error'
                //     });

                //     return;
                // }

                if (!that.$data.form.new_password1.trim() && (that.$data.form.new_password1.trim() !== that.$data.form.new_password2.trim())) {
                        that.$notify({
                        text: 'New passwords do not match.',
                        duration: 10000,
                        type: 'error'
                    });

                    return;
                }

                that.$data.form.uid = that.$route.query.uidb64
                that.$data.form.token = that.$route.query.token

                HTTP.post('/users/api/reset-password/', that.$data.form).then(response => {
                    that.$notify({
                        text: 'Password reset.',
                        duration: 10000,
                        type: 'success'
                    });

                    that.$router.push({name: 'user'});
                }).catch((error) => {
                    let message = ('new_password2' in error.response.data) ? error.response.data.new_password2 : ["Could not reset your password."];
                    let message_token = ('token' in error.response.data) ? message = message.concat("Token is not valid.") : null;
                    message.forEach(function(item){
                        that.$notify({
                            text: item,
                            duration: 10000,
                            type: 'error',
                        });
                    });
                });
            },
            cancel: function () {
                this.$router.push({
                    name: 'user'
                });
            }
        },
    }
</script>
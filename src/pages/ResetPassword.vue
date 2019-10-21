<template>
    <b-container fluid class="h-100">
        <div class="h-25"></div>

        <!-- <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.password" placeholder="Password"></b-form-input>
            </b-col>
        </b-row> -->

        <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.new_password" placeholder="New Password">
                </b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12" md="6" offset-md="3">
                <b-form-input type="password" size="lg" v-model="form.confirm_new_password"
                    placeholder="Confirm Password"></b-form-input>
            </b-col>
        </b-row>

        <b-row>
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
                new_password: '',
                confirm_new_password: ''
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

                if (!that.$data.form.new_password.trim() && (that.$data.form.new_password.trim() !== that.$data.form.confirm_new_password.trim())) {
                        that.$notify({
                        text: 'New passwords do not match.',
                        duration: 10000,
                        type: 'error'
                    });

                    return;
                }

                HTTP.post('/users/api/change-password/', that.$data.form).then(response => {
                    that.$notify({
                        text: 'Password changed.',
                        duration: 10000,
                        type: 'success'
                    });

                    that.$router.push({name: 'user'});
                }).catch(() => {
                    that.$notify({
                        text: 'Could not change password.',
                        duration: 10000,
                        type: 'error'
                    });
                });
            },
            cancel: function () {
                this.$router.push({
                    name: 'user'
                });
            }
        }
    }
</script>
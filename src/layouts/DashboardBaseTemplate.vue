<template>
    <!-- <v-content>
        <v-container fluid fill-height>
            <v-layout column>
                <Navbar />

                <router-view></router-view>

                <Footer />
            </v-layout>
        </v-container>
    </v-content> -->


    <div class="w-100 h-100 p-0 m-0 bg-warning">
        <b-container class="h-100">
            <b-row class="h-100">
                <b-col sm="3" md="2" class="bg-danger">
                    <Navbar />
                </b-col>
                <b-col sm="9" md="10" class="bg-success">
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>

        <Footer />

    </div>

</template>

<script>
    /**
     * Use this template for Authenticated views.
     * NOTE: See BaseTemplate.vue for further explanation.
     */

    import Navbar from '@/components/dashboard/Navbar.vue'
    import Footer from '@/components/dashboard/Footer.vue'

    import BaseDialogMixin from '@/components/mixins/BaseDialogMixin.vue';
    import BaseAlertMixin from '@/components/mixins/BaseAlertMixin.vue';

    import {
        mapActions
    } from 'vuex';

    import store from '@/store/store';

    export default {
        mixins: [BaseDialogMixin, BaseAlertMixin],
        components: {
            Navbar,
            Footer
        },
        beforeRouteEnter(to, from, next) {
            store.dispatch('setBaseComponent', 'DashboardBaseTemplate');
            next();
        },
        beforeRouteUpdate(to, from, next) {
            this.setBaseComponent('DashboardBaseTemplate');
            next();
        },
        created: function () {
            this.setBaseComponent('DashboardBaseTemplate')
        },
        methods: {
            ...mapActions(['setBaseComponent'])
        }
    }
</script>

<style>

</style>

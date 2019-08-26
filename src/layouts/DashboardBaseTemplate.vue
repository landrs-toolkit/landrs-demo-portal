<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout column>
                <Navbar />

                <router-view></router-view>

                <Footer />
            </v-layout>
        </v-container>
    </v-content>
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
        beforeRouteEnter (to, from, next) {
            store.dispatch('setBaseComponent', 'DashboardBaseTemplate');
            next();
        },
        beforeRouteUpdate (to, from, next) {
            this.setBaseComponent('DashboardBaseTemplate');
            next();
        },
        created: function() {
            this.setBaseComponent('DashboardBaseTemplate')
        },
        methods: {
            ...mapActions(['setBaseComponent'])
        }
    }
</script>

<style>

</style>

<template>
    <v-container fluid fill-height>
        <v-layout column align-start justify-start>
            <h2 class="headline">Welcome to the Dashboard!</h2>
            <v-divider></v-divider>
        </v-layout>
    </v-container>
</template>

<script>
    import DashboardBaseTemplate from '@/layouts/DashboardBaseTemplate.vue'

    export default {
        mixins: [DashboardBaseTemplate]
    }
</script>

<style>

</style>
<template>
    <v-container fluid fill-height>

        <v-layout column class="justify-center">
            <br><br><br>
            <h1 class="text-center">Page Not Found!</h1>

            <v-row>
                <v-col></v-col>
                <v-col md="3">
                    <v-btn depressed x-large block color="primary" @click="goBack">Go Back</v-btn>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-layout>

    </v-container>
</template>

<script>
    import BlankBaseTemplate from '@/layouts/BlankBaseTemplate.vue'

    export default {
        mixins: [BlankBaseTemplate],
        methods: {
            goBack: function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>

</style>

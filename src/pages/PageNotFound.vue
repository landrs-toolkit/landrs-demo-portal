<template>
    <div class="h-75 mx-auto text-center">
        <div class="h-25"></div>
        <h1 class="display-1">404</h1>
        <h1 class="display-1">Page Not Found</h1>

        <b-container>
            <b-row>
                <b-col class="col-12 col-md-8 offset-md-2">
                    <b-button block size="lg" variant="secondary" @click="goBack()">Go Back</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
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

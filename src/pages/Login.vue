<template>
    <div></div>
</template>

<script>
    import BlankBaseTemplate from '@/layouts/BlankBaseTemplate.vue'
    
    export default {
        mixins: [BlankBaseTemplate],
        mounted: function () {
            this.showLoginDialog();
        }
    }
</script>

<style>

</style>
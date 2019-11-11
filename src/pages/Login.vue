<template>
    <BlankBaseTemplate>

    </BlankBaseTemplate>
</template>

<script>
    import BlankBaseTemplate from '@/layouts/BlankBaseTemplate.vue'
    import BaseDialogMixin from '@/components/mixins/BaseDialogMixin.vue';

    export default {
        mixins: [BlankBaseTemplate],
        components: {
            BlankBaseTemplate
        },
        mounted: function () {
            this.showLoginDialog();
        }
    }
</script>

<style>

</style>
<template>
    <BlankBaseTemplate>
        
    </BlankBaseTemplate>
</template>

<script>
    import BaseDialogMixin from '@/components/mixins/BaseDialogMixin.vue';

    export default {
        mixins: [BaseDialogMixin],
        components: {},
        mounted: function () {
            this.showLoginDialog();
        }
    }
</script>

<style>

</style>
<template>
  <DashboardBaseTemplate>
    <router-view></router-view>
  </DashboardBaseTemplate>
</template>

<script>
import DashboardBaseTemplate from "@/layouts/DashboardBaseTemplate.vue";

export default {
  mixins: [DashboardBaseTemplate],
  components: {
    DashboardBaseTemplate
  }
};
</script>

<style>
</style>

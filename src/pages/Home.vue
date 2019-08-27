<template>
  <div class="h-100">
    <div style="height: 10%;"></div>
    <b-jumbotron header="Bootstrap Vue Cookie Cutter" lead="We bout it bout it"></b-jumbotron>
  </div>
</template>

<script>
  // @ is an alias to /src
  import BaseTemplate from '@/layouts/BaseTemplate.vue'

  export default {
    name: 'home',
    mixins: [BaseTemplate],
  }
</script>
<template>
  <div class="h-100">
    <b-jumbotron header="Bootstrap Vue Cookie Cutter" lead="We bout it bout it" fluid="true"></b-jumbotron>
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
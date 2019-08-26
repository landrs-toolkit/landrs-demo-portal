<template>
  <div>
    <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>Welcome to BVCC - Bootstrap Vue Cookie Cutter</p>
    </b-jumbotron>
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
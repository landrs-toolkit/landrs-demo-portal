<template>

  <b-modal v-model="loadingDialog" centered no-close-on-esc no-close-on-backdrop hide-header hide-header-close hide-footer>
    <div class="text-center">
      <div><b-spinner style="width: 3rem; height: 3rem;" class="mb-2" variant="primary" label="Text Centered"></b-spinner></div>
      <div>{{loadingDialogMessage}}</div>
    </div>
  </b-modal>

</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
      ...mapState('dialog', ['loadingDialog', 'loadingDialogMessage'])
    },
    methods: {

    }
  }
</script>
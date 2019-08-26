<template>
  <v-layout justify-center>
    
    <!-- <div class="text-center"> -->
        <!-- <v-btn
        :disabled="dialog"
        :loading="dialog"
        class="white--text"
        color="purple darken-2"
        @click="dialog = true"
        >
        Start loading
        </v-btn> -->
        <v-dialog
        v-model="loadingDialog"
        hide-overlay
        persistent
        width="300"
        >
        <v-card
            color="primary"
            dark
        >
            <v-card-text>
            {{loadingDialogMessage}}
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
        </v-dialog>
    <!-- </div> -->


  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    data () {
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
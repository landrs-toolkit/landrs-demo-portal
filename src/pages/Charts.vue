<template>
  <div class="h-100">
    <h1>{{title}}</h1>

    <b-container fluid class="px-0">
      <b-form-row>
        <b-col md="12" lg="8" xl="6" class="py-1">
          <SampleTable />
        </b-col>
        <b-col md="12" lg="8" xl="6" class="py-1">
          <SampleHorizontalBar />
        </b-col>
      </b-form-row>
    </b-container>

    <b-container fluid class="px-0">
      <b-form-row>
        <b-col md="6" lg="4" xl="3" class="py-1">
          <Doughnut />
        </b-col>
        <b-col md="6" lg="4" xl="3" class="py-1">
          <SampleBar />
        </b-col>
        <b-col md="6" lg="4" xl="3" class="py-1">
          <SingleNumberA />
          <br />
          <SingleNumberB />
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import Doughnut from "@/components/charts/Doughnut.vue";
import SampleTable from "@/components/charts/SampleTable.vue";
import SampleBar from "@/components/charts/SampleBar.vue";
import SampleHorizontalBar from "@/components/charts/SampleHorizontalBar.vue";
import SingleNumberA from "@/components/charts/SingleNumberA.vue";
import SingleNumberB from "@/components/charts/SingleNumberB.vue";

import {
        mapState
    } from 'vuex'

export default {
  mixins: [],
  components: {
    Doughnut,
    SampleTable,
    SampleBar,
    SampleHorizontalBar,
    SingleNumberA,
    SingleNumberB
  },
        data: function () {
            return {
                title: 'Examples Charts Page'
            }
        },
        computed: {
            ...mapState('sample', ['sample']),
            // ...mapGetters('sample', ['nameOfGetter'])
        },
        created: function () {

        },
        mounted: function () {

        },
        methods: {
            // ...mapActions('sample', ['nameOfAction']),
            get: function () {
                // HTTP.get('/').then((response) => {
                //     let something = response.data;
                // }).catch((error) => {
                //     HandleErrors.HandleErrors(error);
                // });
            },
            find: function () {

            },
            create: function () {

            },
            patch: function () {

            },
            update: function () {

            },
            delete: function () {

            }
        }
        // beforeRouteEnter(to, from, next) {
        //     // called before the route that renders this component is confirmed.
        //     // does NOT have access to `this` component instance,
        //     // because it has not been created yet when this guard is called!
        // },
        // beforeRouteUpdate(to, from, next) {
        //     // called when the route that renders this component has changed,
        //     // but this component is reused in the new route.
        //     // For example, for a route with dynamic params `/foo/:id`, when we
        //     // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
        //     // will be reused, and this hook will be called when that happens.
        //     // has access to `this` component instance.
        // },
        // beforeRouteLeave(to, from, next) {
        //     // called when the route that renders this component is about to
        //     // be navigated away from.
        //     // has access to `this` component instance.
        // },
    }
</script>

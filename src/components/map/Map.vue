<template>
  <div class="tw-w-100 tw-h-full tw-text-gray-900">

    <v-map ref="myMap" :zoom="10" :center="initialLocation" class="tw-h-full">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <!-- <v-tilelayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"></v-tilelayer> -->

      <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
      <v-marker :lat-lng="[47.513220, -1.319482]"></v-marker>
      <v-marker :lat-lng="[47.553220, -1.119482]" :icon="icon"></v-marker>

      <v-circle :lat-lng="[47.553220, -1.119482]" :radius="6000"></v-circle>
      <v-rectangle :bounds="bounds" :weight="1" :color="'#ff0000'"></v-rectangle>
    </v-map>

    
  </div>
</template>

<script>
// import {
//     HTTP
// } from '@/utilities/http-common';
// import HandleErrors from '@/utilities/handle-errors';

// import {
//     mapState, mapGetters, mapActions
// } from 'vuex';

import { LMap, LTileLayer, LMarker, LCircle, LRectangle } from "vue2-leaflet";
import { Icon, Marker, LayerGroup } from "leaflet";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  mixins: [],
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-marker": LMarker,
    "v-circle": LCircle,
    "v-rectangle": LRectangle
  },
  props: {
  },
  data: function() {
    return {
      initialLocation: [47.413220, -1.219482],
      bounds: [[47.9, -2], [47.0, -0.5]],
      icon: new Icon({iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png'})
    };
  },
  computed: {
    // ...mapState('sample', ['sample'])
  },
  created: function() {},
  mounted: function() {
    this.$nextTick(() => {
      this.$refs.myMap.mapObject.fitBounds(this.bounds);
    });
  },
  methods: {
    get: function() {
      // HTTP.get('/').then((response) => {
      //     let something = response.data;
      // }).catch((error) => {
      //     HandleErrors.HandleErrors(error);
      // });
    },
    find: function() {},
    create: function() {},
    patch: function() {},
    update: function() {},
    delete: function() {},
    doSomething: function() {
      var littleton = new Marker([47.413220, -1.219482]).bindPopup('This is Littleton, CO.'),
          denver    = new Marker([47.513220, -1.219482]).bindPopup('This is Denver, CO.'),
          aurora    = new Marker([47.553220, -1.219482]).bindPopup('This is Aurora, CO.');
      var cities = new LayerGroup([littleton, denver, aurora]);
      this.$refs.myMap.mapObject.addLayer(cities);
    }
  }
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Notifications from 'vue-notification'

import BlankBaseTemplate from '@/layouts/BlankBaseTemplate.vue';

Vue.config.productionTip = false

Vue.use(Notifications);

export default function (Vue, { head, router, isServer }) {
  Vue.component('BlankBaseTemplate', BlankBaseTemplate)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

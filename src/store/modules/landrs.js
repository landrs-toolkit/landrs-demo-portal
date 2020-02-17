import {
  HTTP
} from '@/utilities/http-common';
import fcb from './landrs/fcb';

export default {
  namespaced: true,
  modules: {
    fcb: fcb
  },
  state: {
    landrs: {}
  },
  getters: {
    getTypes (state) {
      return state.landrs['@graph'];
    }
  },
  mutations: {
    setTypes(state, payload) {
      state.landrs = payload;
    }
  },
  actions: {
    async fetchTypes() {
      const response = await HTTP.get('/schema/?format=jsonld');
      return response.data;
    }
  },
}

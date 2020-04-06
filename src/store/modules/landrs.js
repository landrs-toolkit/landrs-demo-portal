import fcb from './landrs/fcb';
import { HTTP } from '@/utilities/http-common';

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
      return state.landrs;
    }
  },
  mutations: {
    setTypes(state, payload) {
      state.landrs = payload;
    }
  },
  actions: {
    async fetchTypes() {
      const dataset = await HTTP.get('/construct', { params: { type: '<http://www.w3.org/ns/shacl#NodeShape>', target: '<http://www.w3.org/ns/shacl#targetClass>' } }).then(response => response.data);

      return dataset.map(quad => ({ type: quad.object.value, id: quad.subject.value }));
    }
  },
}

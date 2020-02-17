import {
  HTTP
} from '@/utilities/http-common';

export default {
  namespaced: true,
  state: {
    fcb: {}
  },
  getters: {
    getFCB (state) {
      return state.fcb
    }
  },
  mutations: {
    setFCB (state, payload) {
      state.fcb = payload;
    }
  },
  actions: {
    async fetchFCB () {
      const response = await HTTP.get('/schema/Thing/drone/fls/FlightControllerBoard?format=jsonld');
      return response.data;
    }
  },
}
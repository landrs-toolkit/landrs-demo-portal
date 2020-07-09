import { HTTP } from '@/utilities/http-common';

export default {
  namespaced: true,
  state: {
    fcb: {},
    shape: '',
    type: '',
    instanceType: ''
  },
  getters: {
    getShapeType(state) {
      return state.type;
    },
    getFCB (state) {
      return state.fcb;
    },
    getShape(state) {
      return state.shape;
    },
    getInstanceType(state) {
      return state.instanceType;
    }
  },
  mutations: {
    setShapeType(state, payload) {
      state.type = payload;
    },
    setFCB (state, payload) {
      state.fcb = payload;
    },
    setShape(state, payload) {
      state.shape = payload;
    },
    setInstanceType(state, payload) {
      state.instanceType = payload;
    }
  },
  actions: {
    async fetchFCB () {
      // todo fetch  and parse the existing list of instances
      // const response = await HTTP.get('/schema/Thing/drone/fls/FlightControllerBoard?format=jsonld');
      const response = {
        data: {}
      };
      return response.data;
    },
    async fetchShape({state}) {
      const config = {
        headers: { Accept: 'text/turtle' },
        responseType: 'text',
        params: { list: `<http://schema.landrs.org/schema/${state.type}>` }
      };

      return await HTTP.get('/describe', config).then(response => response.data);
    }
  },
}

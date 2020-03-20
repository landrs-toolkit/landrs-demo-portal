import SimpleClient from 'sparql-http-client/SimpleClient'

export default {
  namespaced: true,
  state: {
    fcb: {},
    shape: '',
    type: ''
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
      const client = new SimpleClient({ endpointUrl: 'http://ld.landrs.org/query', headers: {
        Accept: 'text/ttl'
      }})

      const resp = await client.query.get('DESCRIBE <http://schema.landrs.org/schema/'+state.type+">") 
      return await resp.text()
    }
  },
}

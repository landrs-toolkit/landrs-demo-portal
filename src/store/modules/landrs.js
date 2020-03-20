import fcb from './landrs/fcb';
import rdf from 'rdf-ext';
import SparqlClient from 'sparql-http-client';

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
      const client = new SparqlClient({ endpointUrl: 'http://ld.landrs.org/query', headers: {
        Accept: 'text/n3'
      } })

      const stream = await client.query.construct(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX shacl: <http://www.w3.org/ns/shacl#>
        CONSTRUCT {
          ?sub shacl:targetClass ?target
        } WHERE {
          ?sub rdf:type shacl:NodeShape .
          ?sub shacl:targetClass ?target .
        } 
      `)

      const dataset = rdf.dataset()
      await dataset.import(stream)

      var res = []
      for( var quad of dataset ){
        res.push({ type: quad.object.value, id: quad.subject.value})
      }
      return res;
    }
  },
}

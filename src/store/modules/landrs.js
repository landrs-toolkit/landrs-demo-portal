import fcb from './landrs/fcb';
import SparqlClient from 'sparql-http-client';
import SimpleClient from 'sparql-http-client/SimpleClient';
import rdf from 'rdf-ext';

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
    async constructQuery (context, options) {
      const client = new SparqlClient({ endpointUrl: `${process.env.VUE_APP_SPARQL_BASE_URL}/query` });
      const stream = await client.query.construct(
        `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         CONSTRUCT {
           ?sub ${options.target} ?target
         } WHERE {
           ?sub rdf:type ${options.type} .
           ?sub ${options.target} ?target
         }
        `
      );
      const dataset = rdf.dataset();
      await dataset.import(stream);

      return dataset.toArray();
    },
    async describeQuery (context, options) {
      const client = new SimpleClient({ endpointUrl: `${process.env.VUE_APP_SPARQL_BASE_URL}/query` });
      const response = await client.query.construct(`DESCRIBE ${options.list}`, { headers: { Accept: options.accept ? options.accept : 'application/n-triples' }});
      return await response.text();
    },
    async updateQuery (context, options) {
      const query = `
        BASE <http://ld.landrs.org/>
        PREFIX schema: <http://schema.org/>
        PREFIX sosa: <http://www.w3.org/ns/sosa/>
        PREFIX landrs: <http://schema.landrs.org/schema/>
        INSERT DATA {
          ${options.instanceData}
        }`;
      const authUsername = process.env.VUE_APP_SPARQL_USERNAME;
      const authPassword = process.env.VUE_APP_SPARQL_PASSWORD;
      const client = new SparqlClient({ updateUrl: `${process.env.VUE_APP_SPARQL_BASE_URL}/update`, user: authUsername, password: authPassword });
      await client.query.update(query, { headers: { authorization: `Basic ${Buffer.from(`${authUsername}:${authPassword}`).toString('base64')}` }});
    }
  }
}

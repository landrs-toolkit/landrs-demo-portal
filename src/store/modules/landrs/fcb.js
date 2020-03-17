// import { HTTP } from '@/utilities/http-common';

export default {
  namespaced: true,
  state: {
    fcb: {},
    shape: ''
  },
  getters: {
    getFCB (state) {
      return state.fcb;
    },
    getShape(state) {
      return state.shape;
    }
  },
  mutations: {
    setFCB (state, payload) {
      state.fcb = payload;
    },
    setShape(state, payload) {
      state.shape = payload;
    }
  },
  actions: {
    async fetchFCB () {
      // todo fetch existing list of instances
      // const response = await HTTP.get('/schema/Thing/drone/fls/FlightControllerBoard?format=jsonld');
      const response = {
        data: {}
      };
      return response.data;
    },
    async fetchShape() {
      // TODO replace mock response with async call to API to fetch Shape data
      /*const response = {
        data: `
#@prefix landrs: <https://schema.landrs.org/schema/> .
@prefix landrs: <http://dirtforecast.com:33000/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix sosa: <http://www.w3.org/ns/sosa/> .
@prefix sosa-ext: <http://www.w3.org/ns/ssn/ext/> .
@prefix ssn: <http://www.w3.org/ns/ssn/> .
@prefix ssn-system: <http://www.w3.org/ns/ssn/systems/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .


landrs:FlightControllerBoardShape
  a sh:NodeShape ;
  sh:targetClass landrs:FlightControllerBoard ;
####
# FlightControllerBoard mandatory properties
####
sh:property [
  sh:path schema:description ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
  sh:datatype xsd:string ;
] ;
sh:property [
  sh:path schema:identifier ;
  sh:or ( [ sh:datatype xsd:string ; ]
    [ sh:datatype xsd:anyURI ; ] ) ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
] ;
sh:property [
  sh:path schema:name ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
  sh:datatype xsd:string ;
] ;
sh:property [
  sh:path sosa:hosts ;
  sh:NodeKind sh:IRI ;
  sh:class sosa:Sensor ;
  sh:minCount 1 ;
] ;
####
# FlightControllerBoard recommended properties schema.org
####
#sh:property [
#  sh:path schema:manufacturer ;
#  sh:class schema:Organization ;
#] ;
sh:property [
  sh:path schema:manufacturer ;
  sh:class schema:Organization ;
  sh:minCount 1 ;
  sh:message "Manufacturer is recommended. Please fill in a value"@en ;
  sh:severity sh:Warning ;
] ;
#sh:property [
#  sh:path schema:serialNumber ;
#  sh:datatype xsd:string ;
#  sh:maxCount 1 ;
#] ;
sh:property [
  sh:path schema:serialNumber ;
  sh:datatype xsd:string ;
  sh:minCount 1 ;
  sh:message "SerialNumber is recommended. Please fill in a value"@en ;
  sh:severity sh:Warning ;
] ;
####
# Equipment optional properties
####
#sh:property [
#  sh:path dct:isPartOf ;
#  sh:or ( [ sh:class epos:Equipment ; ]
#    [ sh:class epos:Facility ; ] );
#] ;
.


landrs:sensorShape
  a sh:NodeShape ;
  sh:targetClass sosa:Sensor ;
sh:property [
  sh:path sosa:observes ;
  sh:NodeKind sh:IRI ;
  sh:class sosa:ObservableProperty ;
  sh:minCount 1 ;
] ;
sh:property [
  sh:path schema:description ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
  sh:datatype xsd:string ;
] ;
sh:property [
  sh:path schema:identifier ;
  sh:or ( [ sh:datatype xsd:string ; ]
    [ sh:datatype xsd:anyURI ; ] ) ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
] ;
sh:property [
  sh:path schema:name ;
  sh:minCount 1 ;
  sh:maxCount 1 ;
  sh:datatype xsd:string ;
] ;
.
        `
      };

      return response.data;*/
      // return HTTP.get('/schema/FlightControllerBoardShape?format=ttl').then(response => response.data);
      const response = {
        data: `
@prefix schema: <http://schema.org/> .
@prefix owl:   <http://www.w3.org/2002/07/owl#> .
@prefix eqp:   <https://data.nasa.gov/ontologies/atmonto/equipment#> .
@prefix wdt:   <http://www.wikidata.org/prop/direct/> .
@prefix qudt-1-1: <http://qudt.org/1.1/schema/qudt#> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix skos:  <http://www.w3.org/2004/02/skos/core#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix aero:  <https://ld.landrs.org/semantics.aero/pages/swim-vocabulary#> .
@prefix wd:    <http://www.wikidata.org/entity/> .
@prefix envo:  <http://purl.obolibrary.org/obo/> .
@prefix ssn:   <http://www.w3.org/ns/ssn/> .
@prefix hydra: <http://www.w3.org/ns/hydra/core#> .
@prefix traj:  <http://w3id.org/daselab/onto/trajectory#> .
@prefix sf:    <http://www.opengis.net/ont/sf#> .
@prefix dct:   <http://purl.org/dc/terms/> .
@prefix sh:    <http://www.w3.org/ns/shacl#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix sosa-ext: <http://www.w3.org/ns/ssn/ext/> .
@prefix atm:   <https://data.nasa.gov/ontologies/atmonto/ATM#> .
@prefix vann:  <http://purl.org/vocab/vann/> .
@prefix dcat:  <http://www.w3.org/ns/dcat#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
@prefix ssn-system: <http://www.w3.org/ns/ssn/systems/> .
@prefix sosa:  <http://www.w3.org/ns/sosa/> .
@prefix st:    <http://www.opengis.net/spec/iot_sensing/1.0/req/> .
@prefix wgs:   <http://www.w3.org/2003/01/geo/wgs84_pos#> .
@prefix void:  <http://rdfs.org/ns/void#> .
@prefix qudt-unit-1-1: <http://qudt.org/1.1/vocab/unit#> .
@prefix cpo:   <http://daselab.org/ContextualizedWinstonPartWhole#> .
@prefix voaf:  <http://purl.org/vocommons/voaf#> .
@prefix ir:    <http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#> .
@prefix td:    <https://www.w3.org/2019/wot/td#> .
@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix geoschemas: <http://geoschemas.org/> .
@prefix dbr:   <http://dbpedia.org/resource/> .
@prefix dctype: <http://purl.org/dc/dcmitype/> .
@prefix landrs: <https://ld.landrs.org/schema/> .
@prefix step:  <http://www.purl.org/net/step#> .
@prefix bibo:  <http://purl.org/ontology/bibo/> .
@prefix time:  <http://www.w3.org/2006/time#> .
@prefix po:    <http://daselab.org/WinstonPartWhole#> .
@prefix dc:    <http://purl.org/dc/elements/1.1/> .

landrs:FlightControllerBoardShape
        a               sh:NodeShape ;
        sh:property     [ sh:datatype  xsd:string ;
                          sh:message   "SerialNumber is recommended. Please fill in a value"@en ;
                          sh:minCount  1 ;
                          sh:path      schema:serialNumber ;
                          sh:severity  sh:Warning
                        ] ;
        sh:property     [ sh:NodeKind  sh:IRI ;
                          sh:class     schema:Organization ;
                          sh:message   "Manufacturer is recommended. Please fill in a value"@en ;
                          sh:minCount  1 ;
                          sh:path      schema:manufacturer ;
                          sh:severity  sh:Warning
                        ] ;
        sh:property     [ sh:NodeKind  sh:IRI ;
                          sh:class     sosa:Sensor ;
                          sh:minCount  1 ;
                          sh:path      sosa:hosts
                        ] ;
        sh:property     [ sh:datatype  xsd:string ;
                          sh:maxCount  1 ;
                          sh:minCount  1 ;
                          sh:path      schema:name
                        ] ;
        sh:property     [ sh:maxCount  0 ;
                          sh:minCount  1 ;
                          sh:or        [ a          rdf:List , rdfs:Resource ;
                                         rdf:first  [ sh:datatype  xsd:string ] ;
                                         rdf:rest   [ a          rdf:List , rdfs:Resource ;
                                                      rdf:first  [ sh:datatype  xsd:anyURI ] ;
                                                      rdf:rest   ()
                                                    ]
                                       ] ;
                          sh:path      schema:identifier
                        ] ;
        sh:property     [ sh:datatype  xsd:string ;
                          sh:maxCount  1 ;
                          sh:minCount  1 ;
                          sh:path      schema:description
                        ] ;
        sh:targetClass  landrs:FlightControllerBoard .
        `
      };
      return response.data;
    }
  },
}

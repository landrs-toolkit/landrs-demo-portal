import {
  HTTP
} from '@/utilities/http-common';

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
      const response = await HTTP.get('/schema/Thing/drone/fls/FlightControllerBoard?format=jsonld');
      return response.data;
    },
    async fetchShape() {
      // TODO replace mock response with async call to API to fetch Shape data
      const response = {
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
   sosa:minCount 1 ;
 ] ;
####
# FlightControllerBoard recommended properties schema.org
####
 sh:property [
      sh:path schema:manufacturer ;
      sh:class schema:Organization ;
 ] ;
 sh:property [
      sh:path schema:manufacturer ;
      sh:class schema:Organization ;
      sh:minCount 1 ;
      sh:message "Manufacturer is recommended. Please fill in a value"@en ;
      sh:severity sh:Warning ;
 ] ;
 sh:property [
      sh:path schema:serialNumber ;
      sh:datatype xsd:string ;
      sh:maxCount 1 ;
 ] ;
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
 #     sh:path dct:isPartOf ;
 #     sh:or ( [ sh:class epos:Equipment ; ]
 #       [ sh:class epos:Facility ; ] );
 #] ;
.


landrs:sensorShape
  a sh:NodeShape ;
  sh:targetClass sosa:Sensor ;
sh:property [
  sh:path sosa:observes ;
  sh:NodeKind sh:IRI ;
  sh:class sosa:ObservableProperty ;
  sosa:minCount 1 ;
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

      return response.data;
    }
  },
}
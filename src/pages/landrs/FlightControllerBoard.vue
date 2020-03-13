<template>
    <BaseTemplate>
        <b-container class="my-5">
            <h4 v-if="getFCB['@type']">{{ getFCB['@type'] | parseTitle }}</h4>
            <b-card bg-variant="light">
                <b-form @submit.prevent="createNewInstance" v-if="showForm">
                    <template
                            v-for="property in formConstraints"
                    >
                        <b-form-group
                                v-if="parseDataType(property.datatype).type !== '' && parseDataType(property.datatype).type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                                :invalid-feedback="formInstanceErrors[property.name]"
                                :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                        >
                            <b-input-group :prepend="parseDataType(property.datatype).type === 'url' ? 'http' : ''">
                                <b-form-input
                                        :id="`input-${property.name}`"
                                        :type="parseDataType(property.datatype).type"
                                        :required="property.required"
                                        v-model="formInstanceData[property.name]"
                                        placeholder="Enter text"
                                        @input="formInstanceErrors[property.name] = null"
                                        :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-if="parseDataType(property.datatype).type === 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                                :invalid-feedback="formInstanceErrors[property.name]"
                                :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                        >
                            <dynamic-input
                                    v-model="formInstanceData[property.name]"
                                    :property="property"
                                    :values="parseDataType(property.datatype, property.name).or"
                                    :selectedType="formInstanceTypes[property.name]"
                                    @updated="formInstanceTypes[property.name] = $event"
                                    @input="formInstanceErrors[property.name] = null"
                                    :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                            >
                            </dynamic-input>
                        </b-form-group>
                    </template>
<!--                    <b-button v-if="getFCB['@type']" type="submit" variant="primary">Add {{ getFCB['@type'] | parseTitle }}</b-button>-->
                    <b-button type="submit" variant="primary">Add Flight Controller Board</b-button>
                </b-form>
            </b-card>

            <h4 class="my-2">Instances</h4>
            <b-card v-if="!fcbInstances.length" bg-variant="light">
                No instances created!
            </b-card>
            <b-card v-for="(fcb, fcbIndex) in fcbInstances" :key="fcbIndex" bg-variant="light">
                <b-form>
                    <b-form-group>
                        <b-button-toolbar class="float-right">
                            <b-button-group>
                                <b-button v-b-tooltip title="Edit instance" variant="primary"><i class="fas fa-edit"></i></b-button>
                                <b-button :id="`popover-target-${fcbIndex}`" title="Remove instance" variant="danger"><i class="fas fa-trash"></i></b-button>
                                <b-popover :ref="`popover-${fcbIndex}`" :target="`popover-target-${fcbIndex}`" triggers="click blur" placement="top">
                                    <template v-slot:title>
                                        Remove Instance?
                                        <b-button-close @click="$refs[`popover-${fcbIndex}`][0].$emit('close')" class="ml-2"></b-button-close>
                                    </template>
                                    <b-button @click="fcbInstances.splice(fcbIndex, 1)" size="sm" variant="primary">Yes, Remove</b-button>
                                </b-popover>
                            </b-button-group>
                        </b-button-toolbar>
                    </b-form-group>
                    <template
                            v-for="property in formConstraints"
                    >
                        <b-form-group
                                v-if="fcb[property.name] && parseDataType(property.datatype).type !== '' && parseDataType(property.datatype).type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                        >
                            <b-input-group :prepend="parseDataType(property.datatype).type === 'url' ? 'http' : ''">
                                <b-form-input
                                        :id="`input-${property.name}`"
                                        :type="parseDataType(property.datatype).type"
                                        :required="property.required"
                                        :value="fcb[property.name].value"
                                        readonly
                                        placeholder="Enter text"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-if="fcb[property.name] && parseDataType(property.datatype).type === 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                        >
                            <dynamic-input
                                    :value="fcb[property.name].value"
                                    :property="property"
                                    readonly
                                    :values="parseDataType(property.datatype).or"
                                    :selectedType="fcb[property.name].type"
                            >
                            </dynamic-input>
                        </b-form-group>
                    </template>
                </b-form>
            </b-card>
        </b-container>
    </BaseTemplate>
</template>

<script>
// @ is an alias to /src
import BaseTemplate from '@/layouts/BaseTemplate.vue';
import SHACLValidator from 'shacl';
import N3Parser from '@rdfjs/parser-n3';
import rdf from 'rdf-ext';
import { fromStream } from 'rdf-dataset-ext';
import { Readable } from 'stream';
import cf from 'clownface';
import namespace from '@rdfjs/namespace'
import { mapActions, mapGetters, mapMutations } from 'vuex';
import dynamicInput from '@/components/landrs/DynamicInputGroup'
import { DataFactory, Writer as N3Writer } from 'n3';
const { namedNode, literal, quad } = DataFactory;
import { v4 as uuidv4 } from 'uuid';

const mapXsdTypes = (xsdType) => {
  switch (xsdType) {
    case 'string': return 'text';
    case 'decimal': return 'number';
    case 'float': return 'number';
    case 'double': return 'number';
    case 'IRI': return 'url';
    case 'anyURI': return 'url';
    case 'date': return 'date';
    case 'time': return 'time';
    default: return '';
  }
};

export default {
  name: 'FlightControllerBoard',
  mixins: [BaseTemplate],
  components: {
    BaseTemplate,
    dynamicInput
  },
  data: function () {
    return {
      fcbInstances: [],
      validator: {},
      formConstraints: [],
      formInstanceData: {},
      formInstanceTypes: {},
      formInstanceErrors: {},
      showForm: true
    };
  },
  computed: {
    ...mapGetters('landrs/fcb', ['getFCB', 'getShape'])
  },
  mounted: async function () {
    this.setFCB(await this.fetchFCB());
    this.setShape(await this.fetchShape());
    // todo fetch available instances
    this.validator = new SHACLValidator();
    // todo fetch shape and all sub-shapes and combine into a single string
    const shapeData = `
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
#sh:property [
#  sh:path sosa:observes ;
#  sh:NodeKind sh:IRI ;
#  sh:class sosa:ObservableProperty ;
#  sh:minCount 1 ;
#] ;
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
    `;
    await new Promise((resolve) => this.validator.updateShapesGraph(shapeData, 'text/turtle', () => resolve()));
    await this.initFormConstraints();
    this.initFormData();
  },
  filters: {
    parseTitle (itemType) {
      const type = itemType.split(':').pop();
      return type.split(/(?=[A-Z][a-z])/).join(' ');
    }
  },
  methods: {
    ...mapActions('landrs/fcb', ['fetchFCB', 'fetchShape']),
    ...mapMutations('landrs/fcb', ['setFCB', 'setShape']),
    initFormData () {
      // todo loop through constraints
      for (const property of this.formConstraints) {
        this.formInstanceData = Object.assign({}, this.formInstanceData, { [property.name]: '' });
        this.formInstanceErrors = Object.assign({}, this.formInstanceErrors, { [property.name]: null });
        const typeInfo = this.parseDataType(property.datatype);
        if (typeInfo.type === 'or') {
          this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [property.name]: typeInfo.or[0] });
        } else {
          this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [property.name]: typeInfo.type });
        }
      }
    },
    async initFormConstraints () {
      const parser = new N3Parser();
      const input = new Readable({
        read: () => {
          input.push(this.getShape);
          input.push(null)
        }
      });
      const dataset = await fromStream(rdf.dataset(), parser.import(input));
      const landrs = namespace('https://ld.landrs.org/schema/');
      const shacl = namespace('http://www.w3.org/ns/shacl#');
      const rdf_syntax_ns = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
      // const xsd = namespace('http://www.w3.org/2001/XMLSchema#');
      const graph = cf({ dataset, term: landrs.FlightControllerBoardShape });
      // console.log(graph.toString());
      // console.log(graph.dataset.toArray());

      this.formConstraints = graph
          .out(shacl.property)
          .map((propertyNode) => {
            const constraints = {
              path: propertyNode.out(shacl.path).value,
              name: propertyNode.out(shacl.path).value.match(/[^/|#]+$/)[0]
            };
            // todo minCount
            propertyNode
              .has(shacl.minCount)
              .out(shacl.minCount)
              .forEach(minCount => (constraints.minCount = parseInt(minCount.value, 10)));
            // todo maxCount
            propertyNode
              .has(shacl.maxCount)
              .out(shacl.maxCount)
              .forEach(maxCount => (constraints.maxCount = parseInt(maxCount.value, 10)));
            // todo datatype
            propertyNode
              .has(shacl.datatype)
              .out(shacl.datatype)
              .forEach(datatype => (constraints.datatype = datatype.value));
            // todo NodeKind
            propertyNode
              .has(shacl.NodeKind)
              .out(shacl.NodeKind)
              .forEach(datatype => (constraints.datatype = datatype.value));
            // todo or type
            const orTypes = [];
            let orDataType = propertyNode
              .has(shacl.or)
              .out(shacl.or)
              .out([rdf_syntax_ns.first, rdf_syntax_ns.rest]);
            while (orDataType.out(shacl.datatype).value) {
              orTypes.push(orDataType.out(shacl.datatype).value);
              orDataType = orDataType.out([rdf_syntax_ns.first, rdf_syntax_ns.rest]);
            }
            if (orTypes.length) {
              constraints.datatype = {
                or: orTypes
              }
            }
            // todo and type
            const andTypes = [];
            let andDataType = propertyNode
              .has(shacl.and)
              .out(shacl.and)
              .out([rdf_syntax_ns.first, rdf_syntax_ns.rest]);
            while (andDataType.out(shacl.datatype).value) {
              andTypes.push(andDataType.out(shacl.datatype).value);
              andDataType = andDataType.out([rdf_syntax_ns.first, rdf_syntax_ns.rest]);
            }
            if (andTypes.length) {
              constraints.datatype = {
                and: andTypes
              }
            }
            // todo check for required properties
            // todo if severity equals violation required is true
            // todo if no severity required is true
            constraints.required = true;
            propertyNode
              .has(shacl.severity)
              .out(shacl.severity)
              .forEach(severity => (constraints.required = severity.term.equals(shacl.Violation)));
            // todo check maxCount for array input
            if (!constraints.maxCount) {
              constraints.isArray = true;
            } else {
              constraints.isArray = constraints.maxCount > 1;
            }

            return constraints;
          })
          .sort((a, b) => a.required || b.required);
      // console.log(this.formConstraints);
    },
    parseDataType (datatype) {
      if (typeof datatype === 'string') {
        // todo parse URL string
        const type = datatype.match(/[^/|#]+$/)[0];
        return {
          type: mapXsdTypes(type)
        };
      } else if (datatype.or) {
        // todo parse array of types
        return {
          type: 'or',
          or: datatype.or.map(fulltype => mapXsdTypes(fulltype.match(/[^/|#]+$/)[0]))
        };
      } else if (datatype.and) {
        // todo parse array of types
        return {
          type: 'and',
          and: datatype.and.map(item => mapXsdTypes(item))
        };
      }
      return { type: '' };
    },
    async createNewInstance () {
      // todo transform form data to turtle
      // console.log(this.formInstanceData);
      // const landrs = namespace('https://ld.landrs.org/schema/');
      const landrs = namespace('http://dirtforecast.com:33000/');
      const schema = namespace('http://schema.org/');
      const sosa = namespace('http://www.w3.org/ns/sosa/');
      const rdf_syntax_ns = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');

      // todo dynamically gather prefixes
      const writer = new N3Writer({
        prefixes: {
          landrs: landrs(),
          schema: schema(),
          sosa: sosa()
        }
      });

      const boardId = btoa(uuidv4());
      let instanceData;
      // todo write node type
      writer.addQuad(
        namedNode(`id/${boardId}`),
        rdf_syntax_ns.type,
        landrs.FlightControllerBoard
      );

      // todo write each property value
      for (const propertyName of Object.keys(this.formInstanceData)) {
        if (propertyName === 'hosts') continue;
        if (this.formInstanceData[propertyName]) {
          const constraint = this.formConstraints.find(con => con.name && con.name === propertyName);
          writer.addQuad(quad(
            namedNode(`id/${boardId}`),
            namedNode(`${constraint.path}`),
            literal(this.formInstanceData[propertyName])
          ));
        }
      }

      const sensorId = btoa(uuidv4());
      writer.addQuad(quad(
        namedNode(`id/${boardId}`),
        sosa.hosts,
        namedNode(`id/${sensorId}`)
      ));
      // todo create dropdown for available sensors
      writer.addQuads([
        quad(
          namedNode(`id/${sensorId}`),
          rdf_syntax_ns.type,
          sosa.Sensor
        ),
        quad(
          namedNode(`id/${sensorId}`),
          schema.identifier,
          literal('this an identifier')
        ),
        quad(
          namedNode(`id/${sensorId}`),
          schema.name,
          literal('this a name')
        ),
        quad(
          namedNode(`id/${sensorId}`),
          schema.description,
          literal('this a description')
        )
      ]);

      writer.end((error, result) => {
        instanceData = result;
        // console.log(result);
      });
      // TODO Validate data before saving a new instance
      if (!(await this.validateInstanceData(instanceData))) {
        return;
      }

      // Transform object arrays into string arrays
      let newInstance = {};
      for (const entry of this.formConstraints) {
        if (this.formInstanceData[entry.name]) {
          newInstance[entry.name] = {
            value: this.formInstanceData[entry.name],
            type: this.formInstanceTypes[entry.name]
          };
          this.formInstanceData = Object.assign({}, this.formInstanceData, { [entry.name]: '' });
          const typeInfo = this.parseDataType(entry.datatype);
          if (typeInfo.type === 'or') {
            this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [entry.name]: typeInfo.or[0] });
          } else {
            this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [entry.name]: typeInfo.type });
          }
        }
      }

      this.fcbInstances.unshift(newInstance);
      // Reset form state
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      })
    },
    async validateInstanceData (instanceData) {
      await new Promise((resolve) => this.validator.updateDataGraph(instanceData, 'text/turtle', () => resolve()));
      const report = await new Promise((resolve, reject) => this.validator.showValidationResults((e, report) => e ? reject(e) : resolve(report)));

      let noViolations = true;
      if (!report.conforms()) {
        const violations = report.results().filter(result => result.severity() === 'Violation');
        violations.forEach((result) => {
          // TODO Link the violation with the corresponding input element generated from the SHACL generated form
          const propertyName = result.path().match(/[^/|#]+$/)[0];
          this.formInstanceErrors[propertyName] = result.message();
          noViolations = false;
        });
      }

      return noViolations;
    }
  }
}
</script>

<style scoped>

</style>
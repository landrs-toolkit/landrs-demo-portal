<template>
    <BaseTemplate>
        <b-container class="my-5">
            <h4 v-if="getShapeType">{{ getShapeType | parseTitle }}</h4>
            <b-card bg-variant="light">
                <b-form @submit.prevent="createNewInstance" v-if="showForm">
                    <template
                            v-for="property in formConstraints"
                    >
                        <b-form-group
                                v-if="property.isArray && property.type !== '' && property.type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                                :invalid-feedback="formInstanceErrors[property.name]"
                                :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                        >
                            <b-input-group
                                    v-for="(urlString, urlIndex) in formInstanceData[property.name]"
                                    :key="urlIndex"
                                    :prepend="property.type === 'url' ? 'http' : ''"
                            >
                                <b-form-input
                                        v-if="property.options.length == 0"
                                        :id="`input-${property.name}-${urlIndex}`"
                                        :type="property.type"
                                        :required="property.required"
                                        placeholder="Enter text"
                                        v-model="urlString.value"
                                        :key="urlIndex"
                                        @input="formInstanceErrors[property.name] = null"
                                        :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                                ></b-form-input>
                                <b-form-select 
                                        v-if="property.options.length > 0"
                                        :id="`select-${property.name}-${urlIndex}`"
                                        :options="property.options"
                                        :required="property.required"
                                        v-model="urlString.value"
                                        :key="urlIndex"
                                        @input="formInstanceErrors[property.name] = null"
                                        :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                                ></b-form-select>
                                <b-input-group-append
                                        v-if="!property.minCount || urlIndex >= property.minCount"
                                >
                                    <b-button variant="danger" @click="formInstanceData[property.name].splice(urlIndex, 1)" ><i class="fas fa-trash"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <b-button
                                    v-if="!property.maxCount || formInstanceData[property.name].length < property.maxCount"
                                    v-b-tooltip :title="`Add ${property.name} entry`"
                                    @click="formInstanceData[property.name].push({ value: '' }) && formInstanceTypes[property.name].push({ value: property.type })"
                                    variant="outline-primary"
                            >
                                <i class="fas fa-plus"></i>
                            </b-button>
                        </b-form-group>
                        <b-form-group
                                v-else-if="property.isArray && property.type === 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                                :invalid-feedback="formInstanceErrors[property.name]"
                                :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                        >
                            <b-input-group
                                    v-for="(urlString, urlIndex) in formInstanceData[property.name]"
                                    :key="urlIndex"
                                    :prepend="property.type === 'url' ? 'http' : ''"
                            >
                                <dynamic-input
                                        v-model="urlString.value"
                                        :property="property"
                                        :values="property.or"
                                        :selectedType="formInstanceTypes[property.name][urlIndex].value"
                                        @updated="formInstanceTypes[property.name][urlIndex].value = $event"
                                        @input="formInstanceErrors[property.name] = null"
                                        :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                                >
                                    <b-input-group-append
                                            v-if="!property.minCount || urlIndex >= property.minCount"
                                    >
                                        <b-button variant="danger" @click="formInstanceData[property.name].splice(urlIndex, 1)" ><i class="fas fa-trash"></i></b-button>
                                    </b-input-group-append>
                                </dynamic-input>
                            </b-input-group>
                            <b-button
                                    v-if="!property.maxCount || formInstanceData[property.name].length < property.maxCount"
                                    v-b-tooltip :title="`Add ${property.name} entry`"
                                    @click="formInstanceData[property.name].push({ value: '' }) && formInstanceTypes[property.name].push({ value: property.or[0] })"
                                    variant="outline-primary"
                            >
                                <i class="fas fa-plus"></i>
                            </b-button>
                        </b-form-group>
                        <b-form-group
                                v-else-if="!property.isArray && property.type !== '' && property.type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                                :invalid-feedback="formInstanceErrors[property.name]"
                                :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                        >
                            <b-input-group :prepend="property.type === 'url' ? 'http' : ''">
                                <b-form-input
                                        :id="`input-${property.name}`"
                                        :type="property.type"
                                        :required="property.required"
                                        v-model="formInstanceData[property.name]"
                                        placeholder="Enter text"
                                        @input="formInstanceErrors[property.name] = null"
                                        :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-else-if="!property.isArray && property.type === 'or'"
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
                                    :values="property.or"
                                    :selectedType="formInstanceTypes[property.name]"
                                    @updated="formInstanceTypes[property.name] = $event"
                                    @input="formInstanceErrors[property.name] = null"
                                    :state="!formInstanceErrors[property.name] ? formInstanceErrors[property.name] : false"
                            >
                            </dynamic-input>
                        </b-form-group>
                    </template>
<!--                    <b-button v-if="getFCB['@type']" type="submit" variant="primary">Add {{ getFCB['@type'] | parseTitle }}</b-button>-->
                    <b-button type="submit" variant="primary">Add {{ getShapeType | parseTitle }}</b-button>
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
                                v-if="fcb[property.name] && property.isArray && property.type !== '' && property.type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                        >
                            <b-input-group
                                    v-for="(item, itemIndex) in fcb[property.name]"
                                    :key="itemIndex"
                                    :prepend="property.type === 'url' ? 'http' : ''"
                            >
                                <b-form-input
                                        :id="`input-${property.name}-${itemIndex}`"
                                        :type="fcb[property.name][itemIndex].type"
                                        :required="property.required"
                                        :value="fcb[property.name][itemIndex].value"
                                        readonly
                                        placeholder="Enter text"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-else-if="fcb[property.name] && property.isArray && property.type === 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                        >
                            <b-input-group
                                    v-for="(item, itemIndex) in fcb[property.name]"
                                    :key="itemIndex"
                                    :prepend="property.type === 'url' ? 'http' : ''"
                            >
                                <dynamic-input
                                        :value="item.value"
                                        :id="`input-${property.name}-${itemIndex}`"
                                        :property="property"
                                        :values="property.or"
                                        :selectedType="item.type"
                                        readonly
                                >
                                </dynamic-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-else-if="fcb[property.name] && !property.isArray && property.type !== '' && property.type !== 'or'"
                                :key="property.path"
                                :label="`${property.name}${property.required ? '*' : ''}:`"
                                :label-for="`input-${property.name}`"
                                label-cols-sm="2"
                                label-align="right"
                        >
                            <b-input-group :prepend="property.type === 'url' ? 'http' : ''">
                                <b-form-input
                                        :id="`input-${property.name}`"
                                        :type="property.type"
                                        :required="property.required"
                                        :value="fcb[property.name].value"
                                        readonly
                                        placeholder="Enter text"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                v-else-if="fcb[property.name] && !property.isArray && property.type === 'or'"
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
                                    :values="property.or"
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
import { HTTP } from '@/utilities/http-common';

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
      showForm: false
    };
  },
  computed: {
    ...mapGetters('landrs/fcb', ['getFCB', 'getShape', 'getShapeType'])
  },
  mounted: async function () {
    this.setShapeType(this.$route.params.object);
    this.setFCB(await this.fetchFCB());
    this.setShape(await this.fetchShape());
    this.validator = new SHACLValidator();
    await new Promise((resolve) => this.validator.updateShapesGraph(this.getShape, 'text/turtle', () => resolve()));
    await this.initFormConstraints();
    this.initFormData();
    this.showForm = true;
  },
  filters: {
    parseTitle (itemType) {
      return itemType.split(/(?=[A-Z][a-z])/).slice(0, -1).join(' ');
    }
  },
  methods: {
    ...mapActions('landrs/fcb', ['fetchFCB', 'fetchShape']),
    ...mapMutations('landrs/fcb', ['setFCB', 'setShape', 'setShapeType']),
    initFormData () {
      // iterate over constraints
      for (const property of this.formConstraints) {
        if (property.isArray) {
          this.formInstanceData = Object.assign({}, this.formInstanceData, { [property.name]: [] });
          this.formInstanceErrors = Object.assign({}, this.formInstanceErrors, { [property.name]: null });
          this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [property.name]: [] });
          const typeInfo = this.parseDataType(property.datatype);
          for (let i = 0; i < property.minCount; i++) {
            this.formInstanceData[property.name].push({ value: '' });
            if (typeInfo.type === 'or') {
              this.formInstanceTypes[property.name].push({ value: typeInfo.or[0] });
            } else {
              this.formInstanceTypes[property.name].push({ value: typeInfo.type });
            }
          }
        } else {
          this.formInstanceData = Object.assign({}, this.formInstanceData, { [property.name]: '' });
          this.formInstanceErrors = Object.assign({}, this.formInstanceErrors, { [property.name]: null });
          const typeInfo = this.parseDataType(property.datatype);
          if (typeInfo.type === 'or') {
            this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [property.name]: typeInfo.or[0] });
          } else {
            this.formInstanceTypes = Object.assign({}, this.formInstanceTypes, { [property.name]: typeInfo.type });
          }
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
      const landrs = namespace('http://schema.landrs.org/schema/');
      const shacl = namespace('http://www.w3.org/ns/shacl#');
      const rdf_syntax_ns = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
      const graph = cf({ dataset, term: landrs(this.$route.params.object) });

      this.formConstraints = await graph
          .out(shacl.property)
          .map((propertyNode) => {
            let constraints = {
              path: propertyNode.out(shacl.path).value,
              name: propertyNode.out(shacl.path).value.match(/[^/|#]+$/)[0],
              minCount: 0,
              maxCount: 0,
              options: []
            };
            // minCount
            propertyNode
              .has(shacl.minCount)
              .out(shacl.minCount)
              .forEach(minCount => (constraints.minCount = parseInt(minCount.value, 10)));
            // maxCount
            propertyNode
              .has(shacl.maxCount)
              .out(shacl.maxCount)
              .forEach(maxCount => (constraints.maxCount = parseInt(maxCount.value, 10)));
            // datatype
            propertyNode
              .has(shacl.datatype)
              .out(shacl.datatype)
              .forEach(datatype => (constraints.datatype = datatype.value));
            // NodeKind
            propertyNode
              .has(shacl.NodeKind)
              .out(shacl.NodeKind)
              .forEach(async datatype => {
                constraints.datatype = datatype.value
                if( datatype.value === shacl.IRI.value){
                  const dataset = await HTTP.get('/construct', { params: { type: `<${propertyNode.out(shacl.class).value}>`, target: '<http://www.w3.org/2000/01/rdf-schema#label>' } }).then(response => response.data);

                  for( const quad of dataset ){
                    constraints.options.push({
                        value: quad.subject.value, 
                        text: quad.object.value 
                    })
                  }
                }
              });
            // or type
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
            // and type
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
            // Add parsed type info to constraint
            constraints = Object.assign(constraints, this.parseDataType(constraints.datatype));
            // Check for required properties
            // if severity equals violation required is true
            // if no severity required is true
            constraints.required = true;
            propertyNode
              .has(shacl.severity)
              .out(shacl.severity)
              .forEach(severity => (constraints.required = severity.term.equals(shacl.Violation)));
            // Check maxCount for array input
            if (!constraints.maxCount) {
              constraints.isArray = true;
            } else {
              constraints.isArray = constraints.maxCount > 1;
            }

            return constraints;
          })
          .sort((a, b) => a.required || b.required);
    },
    parseDataType (datatype) {
      if (typeof datatype === 'string') {
        // parse URL string
        const type = datatype.match(/[^/|#]+$/)[0];
        return {
          type: mapXsdTypes(type)
        };
      } else if (datatype.or) {
        // parse array of types
        return {
          type: 'or',
          or: datatype.or.map(fulltype => mapXsdTypes(fulltype.match(/[^/|#]+$/)[0]))
        };
      } else if (datatype.and) {
        // parse array of types
        return {
          type: 'and',
          and: datatype.and.map(item => mapXsdTypes(item))
        };
      }
      return { type: '' };
    },
    async createNewInstance () {
      // Transform form data to turtle format
      const landrs = namespace('http://schema.landrs.org/schema/');
      const schema = namespace('http://schema.org/');
      const sosa = namespace('http://www.w3.org/ns/sosa/');
      const rdf_syntax_ns = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
      const shacl = namespace('http://www.w3.org/ns/shacl#');

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
      // Write node type
      writer.addQuad(
        namedNode(`id/${boardId}`),
        rdf_syntax_ns.type,
        landrs.FlightControllerBoard
      );

      for (const constraint of this.formConstraints) {
        if (this.formInstanceData[constraint.name] && constraint.isArray) {
          const nonEmptyValues = this.formInstanceData[constraint.name].filter(item => item.value.length > 0);
          for (const entry of nonEmptyValues) {
            if( constraint.datatype === shacl.IRI.value ) {
              writer.addQuad(quad(
                namedNode(`id/${boardId}`),
                namedNode(`${constraint.path}`),
                namedNode(`${entry.value}`)
              ));
            }else{
              writer.addQuad(quad(
                namedNode(`id/${boardId}`),
                namedNode(`${constraint.path}`),
                literal(entry.value)
              ));
            }
          }
        } else {
          writer.addQuad(quad(
            namedNode(`id/${boardId}`),
            namedNode(`${constraint.path}`),
            literal(this.formInstanceData[constraint.name])
          ));
        }
      }

      // Add dependent object information
      const dependentIds = [];
      for (const constraint of this.formConstraints) {
        if (this.formInstanceData[constraint.name] && constraint.isArray) {
          const nonEmptyValues = this.formInstanceData[constraint.name].filter(item => item.value.length > 0);
          for (const entry of nonEmptyValues) {
            if( entry.value.includes("http://ld.landrs.org/id/") ){
              dependentIds.push(entry.value)
            }
          }
        } else {
          if( this.formInstanceData[constraint.name].includes("http://ld.landrs.org/id/") ){
            dependentIds.push(this.formInstanceData[constraint.name])
          }
        }
      }

      if (dependentIds.length) {
        const idList = dependentIds.map( (id) => `<${id}>` ).join(' ');
        const httpConfig = {
          headers: { Accept: 'application/n-triples' },
          responseType: 'text',
          params: { list: idList }
        };
        const triples = await HTTP.get('/describe', httpConfig).then(response => response.data);
        const parser = new N3Parser();
        const input = new Readable({
          read: () => {
            input.push(triples);
            input.push(null)
          }
        });
        const dataset = await fromStream(rdf.dataset(), parser.import(input));
        for (const quad of dataset) {
          writer.addQuad(quad);
        }
      }

      writer.end((error, result) => {
        instanceData = result;
      });

      // Validate data before saving a new instance
      if (!(await this.validateInstanceData(instanceData))) {
        return;
      }

      // Post the ttl data to the API
      {
        let instanceData;

        const writer = new N3Writer({});
        
        writer.addQuad(
          namedNode(`id/${boardId}`),
          rdf_syntax_ns.type,
          landrs.FlightControllerBoard
        );

        for (const constraint of this.formConstraints) {
          if (this.formInstanceData[constraint.name] && constraint.isArray) {
            const nonEmptyValues = this.formInstanceData[constraint.name].filter(item => item.value.length > 0);
            for (const entry of nonEmptyValues) {
              if( constraint.datatype === shacl.IRI.value ) {
                writer.addQuad(quad(
                  namedNode(`id/${boardId}`),
                  namedNode(`${constraint.path}`),
                  namedNode(`${entry.value}`)
                ));
              }else{
                writer.addQuad(quad(
                  namedNode(`id/${boardId}`),
                  namedNode(`${constraint.path}`),
                  literal(entry.value)
                ));
              }
            }
          } else {
            writer.addQuad(quad(
              namedNode(`id/${boardId}`),
              namedNode(`${constraint.path}`),
              literal(this.formInstanceData[constraint.name])
            ));
          }
        }

        writer.end((error, result) => {
          instanceData = result;
        });

        await HTTP.post('/update', instanceData, { headers: { 'Content-Type': 'text/turtle; charset=UTF-8' } })
      }

      // Transform object arrays into string arrays
      let newInstance = {};
      const self = this;
      for (const entry of this.formConstraints) {
        if(this.formInstanceData[entry.name] && entry.isArray) {
          // Add array of values to new instance
          const nonEmptyValues = this.formInstanceData[entry.name].filter(item => item.value.length > 0);
          if (nonEmptyValues.length > 0) {
            newInstance[entry.name] = nonEmptyValues.map((item, itemIndex) => {
              return {
                value: item.value,
                type: self.formInstanceTypes[entry.name][itemIndex].value
              };
            });
          }
        } else if (this.formInstanceData[entry.name]) {
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
      // reset the form
      this.initFormData();
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
          // Link the violation with the corresponding input element generated from the SHACL generated form
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
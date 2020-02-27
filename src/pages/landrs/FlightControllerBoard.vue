<template>
    <BaseTemplate>
        <b-container class="my-5">
            <h4 v-if="getFCB['@type']">{{ getFCB['@type'] | parseTitle }}</h4>
            <b-card bg-variant="light">
                <b-form @submit.prevent="createNewInstance" v-if="showForm">
                    <b-form-group
                            v-for="item in fcbFormStructure" :key="item"
                            :label="`${item}:`"
                            :label-for="`input-${item}`"
                            label-cols-sm="1"
                    >
                        <b-form-group
                                v-if="getFCB[item].constructor.name === 'Object'"
                                :invalid-feedback="fcbNewInstanceErrors[item]"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="text"
                                    required
                                    placeholder="Enter text"
                                    v-model="fcbNewInstanceData[item]"
                                    @input="fcbNewInstanceErrors[item] = null"
                                    :state="!fcbNewInstanceErrors[item] ? fcbNewInstanceErrors[item] : false"
                            ></b-form-input>
                        </b-form-group>

                        <b-input-group
                                v-if="getFCB[item].constructor.name === 'String'"
                                prepend="http"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="url"
                                    required
                                    placeholder="Enter URL"
                                    v-model="fcbNewInstanceData[item]"
                            ></b-form-input>
                        </b-input-group>
                        <b-form-group v-if="getFCB[item].constructor.name === 'Array'">
                            <b-input-group
                                    v-for="(urlString, urlIndex) in fcbNewInstanceData[item]"
                                    :key="urlIndex"
                                    prepend="http"
                            >
                                <b-form-input
                                        :id="`input-${item}`"
                                        type="url"
                                        required
                                        placeholder="Enter URL"
                                        v-model="urlString.value"
                                        :key="urlIndex"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="danger" @click="fcbNewInstanceData[item].splice(urlIndex, 1)" ><i class="fas fa-trash"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <b-button v-b-tooltip :title="`Add ${item} entry`" @click="fcbNewInstanceData[item].push({ value: '' })" variant="outline-primary">
                                <i class="fas fa-plus"></i>
                            </b-button>
                        </b-form-group>
                    </b-form-group>
                    <b-button v-if="getFCB['@type']" type="submit" variant="primary">Add {{ getFCB['@type'] | parseTitle }}</b-button>
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
                    <b-form-group
                            v-for="item in instanceStructure(fcb)" :key="item"
                            :label="`${item}:`"
                            :label-for="`input-${item}`"
                            label-cols-sm="1"
                    >
                        <b-form-input
                                v-if="fcb[item].constructor.name === 'Object'"
                                :id="`input-${item}`"
                                type="text"
                                required
                                placeholder="Enter text"
                                readonly
                                :value="fcb[item]['@value']"
                        ></b-form-input>
                        <b-input-group
                                v-if="fcb[item].constructor.name === 'String'"
                                prepend="http"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="url"
                                    required
                                    placeholder="Enter URL"
                                    readonly
                                    :value="fcb[item]"
                            ></b-form-input>
                        </b-input-group>
                        <b-form-group v-if="fcb[item].constructor.name === 'Array'">
                            <b-input-group
                                    v-for="(urlString, urlIndex) in fcb[item]"
                                    :key="urlIndex"
                                    prepend="http"
                            >
                                <b-form-input
                                        :id="`input-${item}`"
                                        type="url"
                                        required
                                        placeholder="Enter URL"
                                        readonly
                                        :value="urlString"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-form-group>
                </b-form>
            </b-card>
        </b-container>
    </BaseTemplate>
</template>

<script>
// @ is an alias to /src
import BaseTemplate from '@/layouts/BaseTemplate.vue';
import SHACLValidator from 'shacl'
import { mapActions, mapGetters, mapMutations } from 'vuex';

const ignoredKeys = [
  '@id', '@type', '@context'
];

export default {
  name: 'FlightControllerBoard',
  mixins: [BaseTemplate],
  components: {
    BaseTemplate
  },
  data: function () {
    return {
      fcbInstances: [],
      fcbNewInstanceData: {},
      fcbNewInstanceErrors: {},
      showForm: true
    };
  },
  computed: {
    ...mapGetters('landrs/fcb', ['getFCB', 'getShape']),
    fcbFormStructure () {
      const structure = Object.keys(this.getFCB);
      return structure.filter(item => !ignoredKeys.includes(item));
    }
  },
  mounted: async function () {
    this.setFCB(await this.fetchFCB());
    this.setShape(await this.fetchShape());
    this.fcbInstances.push(this.getFCB);
    this.initFormData();
    await this.validateInstanceData();
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
    instanceStructure (instance) {
      const structure = Object.keys(instance);
      return structure.filter(item => !ignoredKeys.includes(item));
    },
    initFormData () {
      // Init all array properties to an empty array
      for (const entry of this.fcbFormStructure) {
        if (this.getFCB[entry].constructor.name === 'Array') {
          // NOTE: here we use Object.assign to enable VueJS reactivity on dynamically added Array properties.
          // A regular property assignment does not enable reactivity.
          this.fcbNewInstanceData = Object.assign({}, this.fcbNewInstanceData, { [entry]: [] });
        } else {
          this.fcbNewInstanceData = Object.assign({}, this.fcbNewInstanceData, { [entry]: '' });
        }
        this.fcbNewInstanceErrors = Object.assign({}, this.fcbNewInstanceErrors, { [entry]: null });
      }
    },
    async createNewInstance () {
      // TODO Validate data before saving a new instance
      if (!(await this.validateInstanceData())) {
        return;
      }

      // Transform object arrays into string arrays
      let newInstance = {};
      for (const entry of this.fcbFormStructure) {
        if (this.fcbNewInstanceData[entry] && this.fcbNewInstanceData[entry].constructor.name === 'Array') {
          newInstance[entry] = this.fcbNewInstanceData[entry].map(item => item.value);
          // Reset the instance form data
          this.fcbNewInstanceData = Object.assign({}, this.fcbNewInstanceData, { [entry]: [] });
        } else if(this.fcbNewInstanceData[entry]) {
          newInstance[entry] = this.fcbNewInstanceData[entry];
          // Reset the instance form data
          this.fcbNewInstanceData = Object.assign({}, this.fcbNewInstanceData, { [entry]: '' });
        }
      }

      // Add metadata
      for (const key of ignoredKeys) {
        if (this.getFCB[key]) {
          newInstance[key] = this.getFCB[key];
        }
      }

      this.fcbInstances.unshift(newInstance);
      // Reset form state
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      })
    },
    async validateInstanceData () {
      const mockInstanceData = `
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .
@prefix wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#> .
@prefix sf: <http://www.opengis.net/ont/sf#> .
@prefix schema: <http://schema.org/> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix sosa: <http://www.w3.org/ns/sosa/> .
@prefix sosa-ext: <http://www.w3.org/ns/ssn/ext/> .
@prefix ssn: <http://www.w3.org/ns/ssn/> .
@prefix ssn-system: <http://www.w3.org/ns/ssn/systems/> .
@prefix qudt-1-1: <http://qudt.org/1.1/schema/qudt#> .
@prefix qudt-unit-1-1: <http://qudt.org/1.1/vocab/unit#> .
@prefix envo: <http://purl.obolibrary.org/obo/> .
@prefix ir: <http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#> .
@prefix st: <http://www.opengis.net/spec/iot_sensing/1.0/req/> .
@prefix hydra: <http://www.w3.org/ns/hydra/core#> .
#@prefix drone: <http://schema.landrs.org/schema/> .
@prefix drone: <http://dirtforecast.com:33000/> .
@prefix geoschemas: <http://geoschemas.org/> .
@prefix td: <https://www.w3.org/2019/wot/td#> .
@prefix eqp: <https://data.nasa.gov/ontologies/atmonto/equipment#> .
@prefix atm: <https://data.nasa.gov/ontologies/atmonto/ATM#> .
@prefix aero: <semantics.aero/pages/swim-vocabulary#> .
@prefix traj: <http://w3id.org/daselab/onto/trajectory#> .
@prefix step: <http://www.purl.org/net/step#> .
@prefix wd: <http://www.wikidata.org/entity/> .
@prefix wdt: <http://www.wikidata.org/prop/direct/> .

<id/Mjc2MzRlZWUtZGRiYS00ZjE5LThjMDMtZDBmNDFjNmQzMTY0Cg==> a drone:FlightControllerBoard ;
drone:isPartOf <id/YWUyMWRjMzAtOTA3NC00ZTYwLWI5ZTUtNjFhZmU1OTAzMTIyCg==> ;
rdfs:label "CUAV 5+ Autopilot Board"@en ;
rdfs:comment "V5+® is an advanced autopilot manufactured by CUAV®. It was designed by CUAV® in collaboration with the PX4 team."@en ;
schema:sameAs <http://docs.px4.io/master/en/flight_controller/cuav_v5_plus.html> ;
schema:Model "CUAV 5+"@en ;
schema:description "fcb description" ;
schema:identifier "fcb identifier" ;
schema:name "fcb name" ;
wdt:P31 wd:Q220858 ;
sosa:hosts <id/OGIxYjVjOGEtOTgwZS00NDZhLTgzNTAtMzYyMzZlMzhjZDQ3Cg==> .

<id/OGIxYjVjOGEtOTgwZS00NDZhLTgzNTAtMzYyMzZlMzhjZDQ3Cg==> a sosa:Sensor ;
rdfs:label "TDK ICM-20629 Accelerometer-Gyroscope"@en ;
rdfs:comment "ICM-20689 is a 6-axis MotionTracking device that combines a 3-axis gyroscope, 3-axis accelerometer" ;
schema:sameAs <https://www.invensense.com/products/motion-tracking/6-axis/icm-20689/> ;
schema:name "This is a name" ;
schema:identifier "This is an identifier" ;
schema:description "This is a description" ;
wdt:P31 wd:Q192940 ;
wdt:P31 wd:Q483400 ;
sosa:isHostedBy <id/Mjc2MzRlZWUtZGRiYS00ZjE5LThjMDMtZDBmNDFjNmQzMTY0Cg==> ;
sosa:observableProperty <http://sweetontology.net/propSpaceDirection/Orientation> ;
sosa:observableProperty <http://sweetontology.net/propSpeed/Acceleration> .
      `;

      const report = await new Promise((resolve, reject) => {
        const validator = new SHACLValidator();
        validator.validate(mockInstanceData, 'text/turtle', this.getShape, 'text/turtle', function(e, report) {
          if (e) {
            reject(e);
          }
          resolve(report);
        });
      });

      let noViolations = true;
      if (!report.conforms()) {
        const violations = report.results().filter(result => result.severity() === 'Violation');
        violations.forEach((result) => {
          console.log(`path: ${result.path()}`);
          console.log(`severity: ${result.severity()}`);
          console.log(`message: ${result.message()}`);
          // TODO properly link the violation to the input element generated from the SHACL generated form
          if (result.path().endsWith('name')) {
            this.fcbNewInstanceErrors['label'] = result.message();
            noViolations = false;
          }
        });
      }

      return noViolations;
    }
  }
}
</script>

<style scoped>

</style>
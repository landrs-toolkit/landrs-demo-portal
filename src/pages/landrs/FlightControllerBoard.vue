<template>
    <BaseTemplate>
        <b-container class="my-5">
            <h4 v-if="getFCB['@type']">{{ getFCB['@type'] | parseTitle }}</h4>
            <b-card bg-variant="light">
                <b-form @submit="createNewInstance" v-if="showForm">
                    <b-form-group
                            v-for="item in fcbFormStructure" :key="item"
                            :label="`${item}:`"
                            :label-for="`input-${item}`"
                            label-cols-sm="1"
                    >
                        <b-form-input
                                v-if="getFCB[item].constructor.name === 'Object'"
                                :id="`input-${item}`"
                                type="text"
                                required
                                placeholder="Enter text"
                                v-model="fcbNewInstanceData[item]"
                        ></b-form-input>
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
                                <b-button v-b-tooltip title="Remove instance" variant="danger"><i class="fas fa-trash"></i></b-button>
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
      showForm: true
    };
  },
  computed: {
    ...mapGetters('landrs/fcb', ['getFCB']),
    fcbFormStructure () {
      const structure = Object.keys(this.getFCB);
      return structure.filter(item => !ignoredKeys.includes(item));
    }
  },
  mounted: async function () {
    this.setFCB(await this.fetchFCB());
    this.fcbInstances.push(this.getFCB);
    this.initFormData();
  },
  filters: {
    parseTitle (itemType) {
      const type = itemType.split(':').pop();
      return type.split(/(?=[A-Z][a-z])/).join(' ');
    }
  },
  methods: {
    ...mapActions('landrs/fcb', ['fetchFCB']),
    ...mapMutations('landrs/fcb', ['setFCB']),
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
      }
    },
    createNewInstance(evt) {
      evt.preventDefault();
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
    }
  }
}
</script>

<style scoped>

</style>
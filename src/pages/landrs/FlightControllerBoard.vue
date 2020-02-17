<template>
    <BaseTemplate>
        <b-container class="my-5">
            <h4 v-if="getFCB['@type']">{{ getFCB['@type'] | parseTitle }}</h4>
            <b-card bg-variant="light">
                <b-form>
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
                            ></b-form-input>
                        </b-input-group>
                        <b-input-group
                                v-if="getFCB[item].constructor.name === 'Array'"
                                prepend="http"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="url"
                                    required
                                    placeholder="Enter URL"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button variant="danger"><i class="fas fa-trash"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-input-group
                                v-if="getFCB[item].constructor.name === 'Array'"
                                prepend="http"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="url"
                                    required
                                    placeholder="Enter URL"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button variant="danger"><i class="fas fa-trash"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-input-group
                                v-if="getFCB[item].constructor.name === 'Array'"
                                prepend="http"
                        >
                            <b-form-input
                                    :id="`input-${item}`"
                                    type="url"
                                    required
                                    placeholder="Enter URL"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button variant="danger"><i class="fas fa-trash"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-button-group
                                v-if="getFCB[item].constructor.name === 'Array'"
                        >
                            <b-button variant="outline-primary">
                                <i class="fas fa-plus"></i>
                            </b-button>
                        </b-button-group>


                    </b-form-group>
                    <b-button variant="primary">Add {{ getFCB['@type'] | parseTitle }}</b-button>
                </b-form>
            </b-card>
<!--            <pre>{{ getFCB }}</pre>-->
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
  computed: {
    ...mapGetters('landrs/fcb', ['getFCB']),
    fcbFormStructure () {
      const structure = Object.keys(this.getFCB);
      return structure.filter(item => !ignoredKeys.includes(item));
    }
  },
  mounted: async function () {
    this.setFCB(await this.fetchFCB())
  },
  filters: {
    parseTitle (itemType) {
      const type = itemType.split(':').pop();
      return type.split(/(?=[A-Z][a-z])/).join(' ');
    }
  },
  methods: {
    ...mapActions('landrs/fcb', ['fetchFCB']),
    ...mapMutations('landrs/fcb', ['setFCB'])
  }
}
</script>

<style scoped>

</style>
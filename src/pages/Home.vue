<template>
  <BaseTemplate>

    <b-jumbotron header="Drone Portal" lead="Demo drone data portal" :fluid="true"></b-jumbotron>

    <b-container class="my-5">
      <h4>Types</h4>
      <b-card-group deck>
        <b-card
          v-for="item in getTypes"
          :key="item.id"
          :title="item.type.split('/').pop()">
          <b-card-text>
            <b-link :href="item.type" target="_blank">Schema <i class="fas fa-external-link-alt"></i></b-link>
          </b-card-text>
          <b-button :to="'type/'+item.id.split('/').pop()" variant="primary">Add new</b-button>
        </b-card>
      </b-card-group>
    </b-container>

  </BaseTemplate>
</template>

<script>
// @ is an alias to /src
import BaseTemplate from '@/layouts/BaseTemplate.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'home',
  mixins: [BaseTemplate],
  components: {
    BaseTemplate
  },
  computed: {
    ...mapGetters('landrs', ['getTypes'])
  },
  mounted: async function () {
    const datasetArray = await this.constructQuery({
      target: '<http://www.w3.org/ns/shacl#targetClass>',
      type: '<http://www.w3.org/ns/shacl#NodeShape>'
    });
    this.setTypes(datasetArray.map(quad => ({ type: quad.object.value, id: quad.subject.value })));
  },
  methods: {
    ...mapActions('landrs', ['constructQuery']),
    ...mapMutations('landrs', ['setTypes']),
    parseTitle (itemType) {
      const type = itemType.split(':').pop();
      return type.split(/(?=[A-Z][a-z])/).join(' ');
    }
  }
};
</script>
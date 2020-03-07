<template>
    <b-input-group>
        <template v-slot:prepend>
            <b-form-select v-model="selectedType" :options="values">
            </b-form-select>
        </template>
        <b-form-input
                :id="`input-${property.name}`"
                :type="selectedType"
                :required="property.required"
                placeholder="Enter text"
                :value="value"
                @input="$emit('input', $event)"
        ></b-form-input>
    </b-input-group>
</template>

<script>

export default {
  name: 'dynamic-input-group',
  props: {
    value: {
      type: String
    },
    property: {
      type: Object
    },
    values: {
      type: Array
    }
  },
  data() {
    return {
      selectedType: null
    };
  },
  mounted () {
    this.selectedType = this.values[0];
  }
}
</script>

<style scoped>

</style>

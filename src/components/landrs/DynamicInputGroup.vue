<template>
    <b-input-group>
        <template v-slot:prepend>
            <b-form-select
                    :value="selectedType"
                    @change="$emit('updated', $event)"
                    :options="values"
                    :disabled="readonly"
            >
            </b-form-select>
        </template>
        <b-form-input
                :id="`input-${property.name}`"
                :type="selectedType"
                :required="property.required"
                placeholder="Enter text"
                :value="value"
                :readonly="readonly"
                @input="$emit('input', $event)"
                :state="state"
        ></b-form-input>
        <slot></slot>
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
    },
    readonly: {
      type: Boolean
    },
    selectedType: {
      type: String
    },
    state: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style scoped>

</style>

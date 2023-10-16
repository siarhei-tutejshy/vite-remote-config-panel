<script setup>
import BaseInput from "@/components/common/base-input/base-input.vue";
import {inject, ref} from "vue";

const emit = defineEmits(['inputsChange'])
const variables = inject('variables')
const define = inject('define')
const importMeta = 'import.meta.env.'

let search = ref('')
let isSelected = ref(false)
let properties = ref([])
let propValue = ref('')
const selectProperty = (property) => {
  isSelected.value = false
  search.value = `${importMeta}${property}`
  propValue.value = variables.value[property]
}

function handlePropertyInput(event) {
  isSelected.value = true
  search.value = event

  const defineKeys = Object.keys(define.value).map(key => (key.replace(importMeta, '')))
  if (search.value && importMeta.includes(search.value.toLowerCase())) {
    properties = Object.keys(variables.value).filter(key => (!defineKeys.includes(key)))
  } else {
    properties = []
  }
  emit('inputsChange', {search, propValue})
}

function handlePropertyValueInput(event) {
  propValue.value = event
  emit('inputsChange', {search, propValue})
}

</script>

<template>
  <div class="define-property">
    <div class="base-input-autocomplete">
      <BaseInput :value="search"
                 @update:model-value="handlePropertyInput"/>
      <ul v-if="properties.length && isSelected"
          class="autocomplete-list">
        <li class="autocomplete-list__item" v-for="property in properties"
            :key="property"
            @click="selectProperty(property)">
          {{ property }}
        </li>
      </ul>
    </div>
    <span>:</span>
    <BaseInput :value="propValue"
               @update:model-value="handlePropertyValueInput"/>
  </div>
</template>

<style src="./define-property.scss" scoped></style>
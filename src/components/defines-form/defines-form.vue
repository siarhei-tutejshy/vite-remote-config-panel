<script setup>
import DefineProperty from "@/components/defines-form/define-property/define-property.vue";
import {computed, inject, ref} from "vue";

const emit = defineEmits(['changeDefine'])
const defineConfig = ref({})
const define = inject('define')

const defineProps = computed(() => {
  return Object.entries(define.value)
})

function handleChanges(event) {
  defineConfig.value = {[event.search.value]: event.propValue.value}
  emit("changeDefine", defineConfig.value)
}

</script>

<template>
  <div class="define-form">
    <h2 class="define-form__title">define config</h2>
    <DefineProperty @inputs-change="handleChanges"/>
    <table>
      <tr v-for="property in defineProps"
          class="define-form__property_raw">
        <td class="property_raw__name-cell">{{ property[0] }}</td>
        <td>:</td>
        <td>{{ property[1] }}</td>

      </tr>
    </table>

  </div>
</template>

<style src="./defines-form.scss" scoped></style>
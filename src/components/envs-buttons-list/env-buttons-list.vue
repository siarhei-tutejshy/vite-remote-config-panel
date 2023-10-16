<script setup>
import BaseButton from "@/components/common/base-button/base-button.vue";

const {envs, mode} = defineProps(['envs', 'mode'])
const emit = defineEmits(['changeEnv'])

function changeEnvironment(event) {
  const env = event.target.textContent
  emit('changeEnv', env)
}
</script>

<template>
  <div class="env-buttons-list">
    <h2 class="env-buttons-list__title">environments</h2>
    <BaseButton v-for="env in envs"
                :is-active="env === mode"
                @click="changeEnvironment">{{ env }}
    </BaseButton>
  </div>
</template>

<style src="./env-buttons-list.scss" scoped></style>
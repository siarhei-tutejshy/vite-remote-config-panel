<script setup>
import BaseButton from "@/components/common/base-button/base-button.vue";

const emit = defineEmits(['reconnectWS'])
</script>

<template>
  <div class="reconnect-backdrop">
    <BaseButton class="reconnect-backdrop__button"
                @click="emit('reconnectWS')">
      reconnect
    </BaseButton>

  </div>

</template>

<style src="./reconnect-backdrop.scss" scoped></style>
<script setup>
const {isActive} = defineProps(['isActive'])

</script>

<template>
  <button class="base-button"
          :class="[{active: isActive}]">
    <slot/>
  </button>
</template>

<style src="./base-button.scss" scoped></style>
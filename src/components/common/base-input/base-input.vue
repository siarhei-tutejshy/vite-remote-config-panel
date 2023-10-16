<script setup>

const {searchTerm} = defineProps(['searchTerm'])
const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <input class="base-input" id="search" :value="searchTerm"
           @input="emit('update:modelValue', $event.target.value)">
</template>

<style src="./base-input.scss" scoped></style>
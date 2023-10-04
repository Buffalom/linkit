<template>
  <div ref="element" v-html="mappedHtml" />
</template>

<script setup lang="ts">
const element = ref<HTMLDivElement>()

const props = defineProps<{
  html?: string | null
}>()

useNuxtLinks(element)
</script>

<template>
  <Component :is="tag" class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-20 xl:px-24">
    <slot />
  </Component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
  }>(),
  {
    tag: 'div',
  }
)
</script>

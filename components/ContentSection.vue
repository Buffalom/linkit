<template>
  <section
    :class="[
      { 'py-0': spacing === 'none' },
      { 'py-16 sm:py-28': spacing === 'md' },
      { 'py-20 sm:py-32': spacing === 'lg' },
    ]"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    spacing?: string
  }>(),
  {
    spacing: 'md',
  }
)
</script>

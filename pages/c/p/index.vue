<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/links')

console.log(data.value)
</script>

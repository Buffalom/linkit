<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/links')

console.dir(error.value)

if (error.value && error.value.statusCode === 401) {
  await navigateTo('/c/p/login')
}

console.log(data.value)
</script>

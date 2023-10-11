<template>
  <div class="mx-auto w-full max-w-xl px-4">
    <div class="rounded-2xl bg-gradient-to-tr from-violet-600 to-red-400 p-1">
      <div class="h-80 space-y-8 rounded-xl bg-white p-6">
        <h1 class="text-4xl font-bold">Links</h1>

        <ul v-if="data">
          <li v-for="link in data.data" :key="link.key">
            <a
              :href="`/${link.key}`"
              target="_blank"
              class="text-blue-600 underline hover:text-blue-700 hover:no-underline"
              >/{{ link.key }}</a
            >
            ->
            <a
              :href="link.url"
              target="_blank"
              class="text-blue-600 underline hover:text-blue-700 hover:no-underline"
              >{{ link.url }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/links')

if (error.value && error.value.statusCode === 401) {
  await navigateTo('/c/p/login')
}
</script>

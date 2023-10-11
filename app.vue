<template>
  <div class="flex min-h-[100dvh] flex-col items-stretch">
    <NuxtLoadingIndicator color="#000" />

    <main class="flex flex-1 flex-col items-stretch py-6">
      <NuxtPage />
    </main>

    <DevOnly>
      <Breaky />
    </DevOnly>
  </div>
</template>

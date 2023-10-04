<template>
  <NuxtLoadingIndicator color="#000" />

  <!-- <Navigation :nav="mainNav" /> -->

  <!-- <GlobalToaster /> -->

  <main class="flex-1">
    <NuxtPage />
  </main>

  <!-- <AppFooter :nav="footerNav" :meta="metaFooterNav" /> -->

  <DevOnly>
    <Breaky />
  </DevOnly>
</template>

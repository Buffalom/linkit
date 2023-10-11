<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="mx-auto w-full max-w-xl px-4">
      <div class="rounded-2xl bg-gradient-to-tr from-violet-600 to-red-400 p-1">
        <form
          class="space-y-8 rounded-xl bg-white p-6"
          @submit.prevent="submit()"
        >
          <h1 class="text-4xl font-bold">Login</h1>

          <div class="space-y-6">
            <div class="space-y-1">
              <label for="email" class="block text-sm font-medium">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="vader@empire.ch"
                class="w-full rounded-md border-2 border-current px-3 py-2 font-medium outline-none ring-offset-2 focus-visible:ring focus-visible:ring-violet-600"
              />
            </div>

            <p
              v-if="'message' in status"
              class="rounded-md p-3 text-sm font-medium"
              :class="{
                'bg-red-100 text-red-900': status.type === 'error',
                'bg-green-100 text-green-900': status.type === 'success',
              }"
            >
              {{ status.message }}
            </p>

            <div>
              <button
                class="rounded-md bg-gradient-to-tr from-violet-600 to-red-400 px-8 py-2 font-bold text-white outline-none ring-offset-2 hover:from-violet-500 hover:to-red-400 focus-visible:ring focus-visible:ring-violet-600"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Status =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'error'; message: string }
  | { type: 'success'; message: string }

const { status: authCheckStatus } = await useFetch('/api/auth/check')

if (authCheckStatus.value === 'success') {
  await navigateTo('/c/p')
}

const email = ref<string>('')
const status = ref<Status>({ type: 'idle' })

async function submit() {
  status.value = { type: 'loading' }

  try {
    const data = await $fetch('/api/auth/magic/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value }),
    })

    status.value = { type: 'success', message: data.message }
  } catch (e) {
    status.value = { type: 'error', message: e.statusMessage }
  }
}
</script>

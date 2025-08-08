<script lang="ts" setup>
const loading2 = ref(true)

const testNew = ref(true)

definePageMeta({
  middleware: 'auth',
  auth: { guestRedirectUrl: '/sign-in' },
})
const test = () => {
  if (loading2.value === false) {
    return
  }
}
onMounted(() => (loading2.value = false))
</script>

<template>
  <Loader v-if="loading2" />
  <div v-else class="flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel">
    <div class="fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />

    <PanelLeft />
    <PanelRight />
  </div>
</template>

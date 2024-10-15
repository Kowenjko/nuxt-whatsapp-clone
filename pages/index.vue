<script lang="ts" setup>
import { useConvexQuery } from '@convex-vue/core'
import { api } from '@/convex/_generated/api'

const { data, isLoading } = await useConvexQuery(api.users.getUsers, {})

console.log(data.value)
const loading = ref(true)

definePageMeta({
	middleware: 'auth',
	auth: { guestRedirectUrl: '/sign-in' },
})
onMounted(() => (loading.value = false))
</script>

<template>
	<Loader v-if="loading" />
	<div
		v-else
		class="flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel"
	>
		<div class="fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />

		<PanelLeft />
		<PanelRight />
	</div>
</template>

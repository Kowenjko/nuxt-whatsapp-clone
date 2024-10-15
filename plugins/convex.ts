import { createConvexVue } from '@convex-vue/core'

export default defineNuxtPlugin((nuxtApp) => {
	const { convexUrl } = useRuntimeConfig().public

	const convexVue = createConvexVue({
		convexUrl: convexUrl,
	})
	nuxtApp.vueApp.use(convexVue)
})

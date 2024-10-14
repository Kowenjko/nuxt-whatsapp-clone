import { createConvexVue } from '@convex-vue/core'

export default defineNuxtPlugin((nuxtApp) => {
	const { convexUrl } = useRuntimeConfig().public
	console.log(convexUrl, 'sdfdsf')

	const convexVue = createConvexVue({
		convexUrl: convexUrl,
	})
	nuxtApp.vueApp.use(convexVue)
})

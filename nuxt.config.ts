// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				compatibilityDate: '2024-04-03',
				devtools: { enabled: true },
				modules: [
								'nuxt-typed-router',
								'@vueuse/nuxt',
								'@nuxt/image',
								'@nuxtjs/html-validator',
								'@nuxtjs/tailwindcss',
								'shadcn-nuxt',
				],
				shadcn: {
								prefix: '',
								componentDir: './components/ui',
				},
})
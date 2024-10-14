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
		'@nuxt/fonts',
		'nuxt-lucide-icons',
	],
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},

	lucide: {
		namePrefix: 'Icon',
	},
	runtimeConfig: {
		public: {
			convexDeployment: process.env.CONVEX_DEPLOYMENT,
			convexUrl: process.env.CONVEX_URL,
		},
	},
})

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
		'vue-clerk/nuxt',
		'@pinia/nuxt',
		'nuxt-emoji-picker',
	],
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	clerk: {
		appearance: {},
	},
	lucide: {
		namePrefix: 'Icon',
	},

	runtimeConfig: {
		public: {
			clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
			convexDeployment: process.env.CONVEX_DEPLOYMENT,
			convexUrl: process.env.CONVEX_URL,
			clerkAppDomain: process.env.NUXT_CLERK_APP_DOMAIN,
			openAiApiKey: process.env.OPENAI_API_KEY,
			zegoAppId: process.env.NUXT_PUBLIC_ZEGO_APP_ID,
			zegoServerSecret: process.env.NUXT_PUBLIC_ZEGO_SERVER_SECRET,
		},
		clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
	},
})

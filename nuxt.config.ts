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
	],
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
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
		},
		clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
	},
})

<script lang="ts" setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `WhatsApp Clone | ${titleChunk}` : 'WhatsApp Clone'
	},
	meta: {
		name: 'description',
		content: 'A workspace for your team, powered by Stream Chat and Clerk.',
	},
	htmlAttrs: { lang: 'en-US' },
	link: [{ rel: 'icon', type: 'image/png', href: '/whatsapp.png' }],
})
</script>

<template>
	<suspense>
		<nuxt-layout>
			<nuxt-page />
		</nuxt-layout>
	</suspense>
</template>

<script lang="ts" setup>
import type { IMessage } from '@/types'

const { content } = defineProps<{ content: IMessage['content'] }>()

const isLink = computed(() => /^(ftp|http|https):\/\/[^ "]+$/.test(content))
</script>

<template>
	<div>
		<nuxt-link
			v-if="isLink"
			:to="content"
			target="_blank"
			rel="noopener noreferrer"
			class="mr-2 text-sm font-light text-blue-400 underline"
		>
			{{ content }}
		</nuxt-link>

		<p v-else class="mr-2 text-sm font-light">{{ content }}</p>
	</div>
</template>

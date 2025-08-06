<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

const openEmoji = ref(false)
const emit = defineEmits<{ selectEmoji: [emoji: any] }>()

const emojiEl = useTemplateRef('emojiRef')
const colorMode = useColorMode()

onClickOutside(emojiEl, (event) => (openEmoji.value = false))
const onSelectEmoji = (emoji: any) => emit('selectEmoji', emoji.i)
</script>

<template>
	<div ref="emojiRef">
		<NuxtEmojiPicker
			v-if="openEmoji"
			:hide-search="false"
			:theme="colorMode"
			@select="onSelectEmoji"
			:style="{ position: 'absolute', bottom: '2.5rem', left: '1rem', zIndex: 50 }"
		/>
		<button @click="openEmoji = !openEmoji" type="button">
			<IconLaugh class="text-gray-600 dark:text-gray-400" />
		</button>
	</div>
</template>

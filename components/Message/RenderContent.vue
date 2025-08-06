<script lang="ts" setup>
import type { IMessage } from '@/types'
defineProps<{ message: IMessage }>()
const emit = defineEmits<{ handleClick: [] }>()

const handleClick = () => emit('handleClick')
</script>

<template>
	<MessageText v-if="message.messageType === 'text'" :content="message.content" />
	<MessageImage
		v-if="message.messageType === 'image'"
		:content="message.content"
		@handle-click="handleClick"
	/>
	<MessageVideo v-if="message.messageType === 'video'" :message="message" />
</template>

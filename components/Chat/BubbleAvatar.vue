<script lang="ts" setup>
import type { IMessage } from '@/types'

defineProps<{
	message: IMessage
	isMember: boolean
}>()
</script>

<template>
	<Avatar class="overflow-visible relative">
		<div
			v-if="message.sender.isOnline && isMember"
			class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-foreground"
		/>

		<AvatarImage :src="message.sender?.image" class="rounded-full object-cover w-8 h-8" />
		<AvatarFallback class="w-8 h-8">
			<div class="animate-pulse bg-gray-tertiary rounded-full"></div>
		</AvatarFallback>
	</Avatar>
</template>

<script lang="ts" setup>
import { getRelativeDateTime, isSameDay } from '@/helpers'
import type { IMessage } from '@/types'

defineProps<{ message: IMessage; previousMessage?: IMessage }>()
</script>

<template>
	<div
		class="flex justify-center"
		v-if="!previousMessage || !isSameDay(previousMessage._creationTime, message._creationTime)"
	>
		<p
			class="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary"
		>
			{{ getRelativeDateTime(message, previousMessage) }}
		</p>
	</div>
</template>

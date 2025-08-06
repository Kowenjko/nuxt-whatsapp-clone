<script lang="ts" setup>
import type { IMessage } from '@/types'

defineProps<{ message: IMessage }>()
</script>

<template>
	<div class="m-2 relative flex justify-center items-center">
		<video
			v-if="message.content"
			:src="message.content"
			width="250px"
			height="250px"
			class="rounded-lg"
			loop
			controls
		/>
	</div>
</template>

<script lang="ts" setup>
import type { IMessage } from '@/types'

const { content } = defineProps<{ content: IMessage['content'] }>()

const emit = defineEmits<{ handleClick: [] }>()

const handleClick = () => emit('handleClick')
</script>

<template>
	<div class="w-[250px] h-[250px] m-2 relative flex justify-center items-center">
		<img
			:src="content"
			class="cursor-pointer object-cover rounded"
			alt="image"
			@click="handleClick"
		/>
	</div>
</template>

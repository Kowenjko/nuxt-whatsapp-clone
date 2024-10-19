<script lang="ts" setup>
import type { IMessage } from '@/types'

defineProps<{ content: IMessage['content'] }>()

const emit = defineEmits<{ handleClick: [] }>()

const handleClick = () => emit('handleClick')
</script>

<template>
	<div class="w-[250px] h-[250px] m-2 relative flex justify-center items-center">
		<NuxtImg
			:src="content"
			class="cursor-pointer object-cover rounded"
			alt="image"
			@click="handleClick"
		/>
	</div>
</template>

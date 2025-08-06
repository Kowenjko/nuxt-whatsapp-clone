<script lang="ts" setup>
const { renderedImage } = defineProps<{ renderedImage: any; isLoading: boolean }>()
const emit = defineEmits<{ handleSendImage: []; close: [] }>()

const isOpen = ref(false)
const handleSendImage = () => emit('handleSendImage')

watch(
	() => renderedImage,
	(value) => (isOpen.value = !!value)
)
</script>

<template>
	<Dialog :open="isOpen" @update:open="emit('close')">
		<DialogContent class="dark:!bg-left-panel">
			<DialogDescription class="flex flex-col gap-10 justify-center items-center">
				<NuxtImg
					v-if="renderedImage"
					:src="renderedImage"
					width="300"
					height="300"
					alt="selected image"
				/>
				<Button class="w-full" :disabled="isLoading" @click="handleSendImage">
					<div v-if="isLoading" class="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
					<span v-else>Send</span>
				</Button>
			</DialogDescription>
		</DialogContent>
	</Dialog>
</template>

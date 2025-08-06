<script lang="ts" setup>
const { renderedVideo } = defineProps<{ renderedVideo: any; isLoading: boolean }>()
const emit = defineEmits<{ handleSendImage: []; close: [] }>()

const isOpen = ref(false)
const handleSendImage = () => emit('handleSendImage')

watch(
	() => renderedVideo,
	(value) => (isOpen.value = !!value)
)
</script>

<template>
	<Dialog :open="isOpen" @update:open="emit('close')">
		<DialogContent class="dark:!bg-left-panel">
			<DialogDescription>Video</DialogDescription>
			<div class="w-full">
				<video :src="renderedVideo" controls width="100%" loop />
			</div>
			<Button class="w-full" :disabled="isLoading" @click="handleSendImage">
				<div v-if="isLoading" class="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
				<span v-else>Send</span>
			</Button>
		</DialogContent>
	</Dialog>
</template>

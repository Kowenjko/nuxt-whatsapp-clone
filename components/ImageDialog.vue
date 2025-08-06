<script lang="ts" setup>
defineProps<{ src: string }>()

const open = defineModel('open')
</script>

<template>
	<Dialog v-model:open="open">
		<DialogContent class="min-w-[750px] dark:bg-left-panel">
			<DialogDescription class="relative h-[450px] flex justify-center">
				<img :src="src" fill class="rounded-lg object-contain" alt="image" />
			</DialogDescription>
		</DialogContent>
	</Dialog>
</template>

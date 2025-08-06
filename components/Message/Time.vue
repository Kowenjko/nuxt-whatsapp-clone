<script lang="ts" setup>
defineProps<{ time: string; fromMe: boolean }>()
</script>

<template>
	<p class="text-[10px] mt-2 self-end flex gap-1 items-center">
		{{ time }} <MessageSeenSvg v-if="fromMe" />
	</p>
</template>

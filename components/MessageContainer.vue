<script lang="ts" setup>
import { messages } from '@/data/db'
</script>
<template>
	<div class="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
		<div class="mx-12 flex flex-col gap-3 h-full">
			<div v-for="msg in messages" :key="msg._id">
				<ChatBubble />
			</div>
		</div>
	</div>
</template>

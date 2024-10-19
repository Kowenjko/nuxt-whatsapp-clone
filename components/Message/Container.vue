<script lang="ts" setup>
import { api } from '@/convex/_generated/api'
import { ConvexQuery } from '@convex-vue/core'

const { tokenIdentifier } = useGetTokenIdentifier()
const chatsStore = useChatsStore()
const { me } = useGetDataInConvex()
</script>
<template>
	<div class="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
		<ConvexQuery
			:query="api.messages.getMessages"
			:args="{ tokenIdentifier, conversation: chatsStore.selectedConversation!._id }"
		>
			<template #loading>Loading Messages...</template>
			<template #empty>No Messages yet.</template>
			<template #default="{ data: messages }">
				<div class="mx-12 flex flex-col gap-3 h-full" v-if="messages && messages.length > 0">
					<div v-for="(message, index) in messages" :key="message._id" ref="lastMessage">
						<ChatBubble
							:message="message"
							:previousMessage="index > 0 ? messages[index - 1] : undefined"
							:me="me"
						/>
					</div>
				</div>
			</template>
		</ConvexQuery>
	</div>
</template>

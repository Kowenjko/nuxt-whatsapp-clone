<script lang="ts" setup>
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@convex-vue/core'

const { tokenIdentifier } = useGetTokenIdentifier()
const chatsStore = useChatsStore()
const { me } = useGetDataInConvex()

const { data: messages } = useConvexQuery(api.messages.getMessages, {
	tokenIdentifier,
	conversation: chatsStore.selectedConversation!._id,
})

const lastMessageRef = useTemplateRef('lastMessage')

watch(messages, () => {
	console.log(lastMessageRef.value)
	if (lastMessageRef.value && Array.isArray(lastMessageRef.value)) {
		setTimeout(() => {
			// @ts-ignore
			lastMessageRef.value?.at(-1)?.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}
})
</script>
<template>
	<div class="relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark">
		<div class="mx-12 flex flex-col gap-3 h-full">
			<div v-for="(message, index) in messages" :key="message._id" ref="lastMessage">
				<ChatBubble
					:message="message"
					:previousMessage="index > 0 ? messages[index - 1] : undefined"
					:me="me"
				/>
			</div>
		</div>
	</div>
</template>

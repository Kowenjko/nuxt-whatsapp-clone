<script lang="ts" setup>
import type { IMessage, Conversation } from '@/types'

const { message, me } = defineProps<{ message: IMessage; me: any }>()

const chatsStore = useChatsStore()
const { kickUser, createConversation } = useMutationInConvex()
const { $toast } = useNuxtApp()

const isMember = computed(() =>
	chatsStore.selectedConversation?.participants.includes(message.sender._id)
)
const fromAI = computed(() => message.sender?.name === 'ChatGPT')
const isGroup = computed(() => chatsStore.selectedConversation?.isGroup)

const handleKickUser = async () => {
	if (fromAI.value) return

	if (!chatsStore.selectedConversation) return
	try {
		await kickUser({
			conversationId: chatsStore.selectedConversation._id,
			userId: message.sender._id,
		})

		chatsStore.setSelectedConversation({
			...chatsStore.selectedConversation,
			participants: chatsStore.selectedConversation.participants.filter(
				(id) => id !== message.sender._id
			),
		})
	} catch (error) {
		$toast.error('Failed to kick user')
	}
}

const handleCreateConversation = async () => {
	if (fromAI.value) return

	try {
		const conversationId = await createConversation({
			isGroup: false,
			participants: [me._id, message.sender._id],
		})

		chatsStore.setSelectedConversation({
			_id: conversationId as Conversation['_id'],
			name: message.sender.name,
			participants: [me._id, message.sender._id],
			isGroup: false,
			isOnline: message.sender.isOnline,
			image: message.sender.image,
		})
	} catch (error) {
		$toast.error('Failed to create conversation')
	}
}
</script>

<template>
	<div
		class="text-[11px] flex gap-4 justify-between font-bold cursor-pointer group"
		@click="handleCreateConversation"
	>
		<span v-if="isGroup">{{ message.sender.name }}</span>
		<IconBan v-if="!isMember && !fromAI && isGroup" :size="16" class="text-red-500" />

		<button
			v-if="isGroup && isMember && chatsStore.selectedConversation?.admin === me._id"
			type="button"
			@click.stop="handleKickUser"
		>
			<IconLogOut :size="16" class="text-red-500 opacity-0 group-hover:opacity-100" />
		</button>
	</div>
</template>

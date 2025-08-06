import { defineStore } from 'pinia'
import type { Conversation } from '@/types'

export const useChatsStore = defineStore('chats', () => {
	const selectedConversation = ref<Conversation | null>(null)

	const setSelectedConversation = (conversation: Conversation | null) => {
		selectedConversation.value = conversation
	}

	return { selectedConversation, setSelectedConversation }
})

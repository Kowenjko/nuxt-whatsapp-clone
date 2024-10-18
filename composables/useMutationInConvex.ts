import { api } from '@/convex/_generated/api'
import { useConvexMutation } from '@convex-vue/core'

export const useMutationInConvex = () => {
	const { mutate: generateUploadUrl } = useConvexMutation(api.conversations.generateUploadUrl)
	const { mutate: createConversation } = useConvexMutation(api.conversations.createConversation)
	const { mutate: kickUser } = useConvexMutation(api.conversations.kickUser)

	const { mutate: sendTextMessage } = useConvexMutation(api.messages.sendTextMessage)

	return { generateUploadUrl, createConversation, sendTextMessage, kickUser }
}

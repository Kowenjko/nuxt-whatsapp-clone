import { api } from '@/convex/_generated/api'
import { useConvexMutation } from '@convex-vue/core'

export const useMutationInConvex = () => {
	const { mutate: generateUploadUrl } = useConvexMutation(api.conversations.generateUploadUrl)
	const { mutate: createConversation } = useConvexMutation(api.conversations.createConversation)

	return { generateUploadUrl, createConversation }
}

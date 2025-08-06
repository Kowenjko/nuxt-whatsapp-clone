import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@convex-vue/core'

export const useGetDataInConvex = () => {
	const { tokenIdentifier } = useGetTokenIdentifier()

	const { data: me } = useConvexQuery(api.users.getMe, { tokenIdentifier })
	const { data: users } = useConvexQuery(api.users.getUsers, { tokenIdentifier })
	const { data: conversations } = useConvexQuery(api.conversations.getMyConversations, {
		tokenIdentifier,
	})

	return { me, users, conversations }
}

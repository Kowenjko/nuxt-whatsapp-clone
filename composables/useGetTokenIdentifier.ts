export const useUseGetTokenIdentifier = () => {
	const { clerkAppDomain } = useRuntimeConfig().public
	const { userId } = useAuth()

	return { tokenIdentifier: clerkAppDomain + '|' + userId.value }
}

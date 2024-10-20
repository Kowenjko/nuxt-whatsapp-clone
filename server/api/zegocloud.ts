import { generateToken04 } from '@/server/utils/zegoServerAssistant'

export default defineEventHandler(async (event) => {
	const { userID } = getQuery(event)
	const { zegoAppId, zegoServerSecret } = useRuntimeConfig().public

	const effectiveTimeInSeconds = 3600
	const payload = ''

	const token = generateToken04(
		+zegoAppId,
		String(userID),
		zegoServerSecret,
		effectiveTimeInSeconds,
		payload
	)

	return { token, appID: +zegoAppId }
})

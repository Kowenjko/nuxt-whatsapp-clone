<script lang="ts" setup>
import { randomID } from '@/helpers'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const { user } = useUser()
const route = useRoute()

const roomID = (route.query?.roomID as string) || randomID(5)

const videoRoomRef = useTemplateRef('videoRoom')

const initMeeting = async () => {
	const response = await $fetch(`/api/zegocloud?userID=${user.value?.id}`)
	const { token, appID } = response

	const username = user.value?.fullName || user.value?.emailAddresses[0].emailAddress.split('@')[0]

	console.log(appID, token, roomID, user.value?.id!, username)

	const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
		appID,
		token,
		roomID,
		user.value?.id!,
		username
	)

	const zp = ZegoUIKitPrebuilt.create(kitToken)

	zp.joinRoom({
		container: videoRoomRef.value,
		sharedLinks: [
			{
				name: 'Personal link',
				url: location.origin + location.pathname + '?roomID=' + roomID,
			},
		],
		scenario: {
			mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
		},
	})
}

watch(user, async () => await initMeeting())

definePageMeta({
	middleware: 'auth',
	auth: { guestRedirectUrl: '/sign-in' },
})
</script>
<template>
	<div class="myCallContainer" ref="videoRoom" :style="{ width: '100vw', height: '100vh' }"></div>
</template>

<script lang="ts" setup>
const isLoading = ref(false)

const { generateUploadUrl, sendVideo, sendImage } = useMutationInConvex()
const { me } = useGetDataInConvex()
const chatsStore = useChatsStore()
const { tokenIdentifier } = useGetTokenIdentifier()
const { $toast } = useNuxtApp()

const {
	selectedFiles: selectedImage,
	openSelectFiles: openSelectImage,
	resetSelectFiles: resetSelectImage,
	renderedFiles: renderedImage,
} = useUploadFiles()

const {
	selectedFiles: selectedVideo,
	openSelectFiles: openSelectVideo,
	resetSelectFiles: resetSelectVideo,
	renderedFiles: renderedVideo,
} = useUploadFiles('video/mp4')

const handleSendImage = async () => {
	isLoading.value = true
	try {
		// Step 1: Get a short-lived upload URL
		const postUrl = await generateUploadUrl({})
		// Step 2: POST the file to the URL
		const result = await $fetch(postUrl!, {
			method: 'POST',
			headers: { 'Content-Type': selectedImage.value!.type },
			body: selectedImage.value,
		})
		// Step 3: Save the newly allocated storage id to the database
		//@ts-ignore
		if (result?.storageId) {
			await sendImage({
				conversation: chatsStore.selectedConversation!._id,
				// @ts-ignore
				imgId: result.storageId,
				sender: me.value!._id,
				tokenIdentifier,
			})
		}
		resetSelectImage()
	} catch (err) {
		$toast.error('Failed to send image')
	} finally {
		isLoading.value = false
	}
}

const handleSendVideo = async () => {
	isLoading.value = true
	try {
		const postUrl = await generateUploadUrl({})
		const result = await $fetch(postUrl!, {
			method: 'POST',
			headers: { 'Content-Type': selectedVideo.value!.type },
			body: selectedVideo.value,
		})
		//@ts-ignore
		if (result?.storageId) {
			await sendVideo({
				conversation: chatsStore.selectedConversation!._id,
				// @ts-ignore
				videoId: result.storageId,
				sender: me.value!._id,
				tokenIdentifier,
			})
		}
		resetSelectVideo()
	} catch (error) {
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<MediaImageDialog
		:renderedImage="renderedImage"
		:isLoading="isLoading"
		@handle-send-image="handleSendImage"
		@close="resetSelectImage"
	/>
	<MediaVideoDialog
		:renderedVideo="renderedVideo"
		:isLoading="isLoading"
		@handle-send-image="handleSendVideo"
		@close="resetSelectVideo"
	/>

	<DropdownMenu>
		<DropdownMenuTrigger>
			<IconPlus class="text-gray-600 dark:text-gray-400" />
		</DropdownMenuTrigger>

		<DropdownMenuContent class="dark:bg-left-panel">
			<DropdownMenuItem @click="openSelectImage">
				<IconImage :size="18" class="mr-1" /> Photo
			</DropdownMenuItem>
			<DropdownMenuItem @click="openSelectVideo">
				<IconVideo :size="20" class="mr-1" />
				Video
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

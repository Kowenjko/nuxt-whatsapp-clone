<script lang="ts" setup>
import type { Id } from '~/convex/_generated/dataModel'
import type { Conversation } from '@/types'

const selectedUsers = ref<string[]>([])
const groupName = ref('')
const isLoading = ref(false)
const isOpen = ref(false)

const { $toast } = useNuxtApp()

const { me, users } = useGetDataInConvex()
const { generateUploadUrl, createConversation } = useMutationInConvex()
const { selectedFiles, renderedFiles, openSelectFiles, resetSelectFiles } = useUploadFiles()
const chatsStore = useChatsStore()

const handleCreateConversation = async () => {
	if (selectedUsers.value.length === 0) return
	isLoading.value = true
	try {
		const isGroup = selectedUsers.value.length > 1

		let conversationId
		if (!isGroup) {
			conversationId = await createConversation({
				participants: [...selectedUsers.value, me.value._id!] as Id<'users'>[],
				isGroup: false,
			})
		} else {
			const postUrl = await generateUploadUrl({})

			const result = await $fetch(postUrl!, {
				method: 'POST',
				headers: { 'Content-Type': selectedFiles.value?.type! },
				body: selectedFiles.value,
			})

			//@ts-ignore
			if (result?.storageId) {
				conversationId = await createConversation({
					participants: [...selectedUsers.value, me.value?._id!] as Id<'users'>[],
					isGroup: true,
					admin: me.value?._id!,
					groupName: groupName.value,
					// @ts-ignore
					groupImage: result?.storageId || '',
				})
			}
			// TODO => Update a global state called "selectedConversation"
			const conversationName = isGroup
				? groupName.value
				: users.value?.find((user) => user._id === selectedUsers.value[0])?.name
			const conversationImage = isGroup
				? renderedFiles
				: users.value?.find((user) => user._id === selectedUsers.value[0])?.image

			chatsStore.setSelectedConversation({
				_id: conversationId as Conversation['_id'],
				participants: selectedUsers.value as Conversation['participants'],
				isGroup,
				image: conversationImage as string,
				name: conversationName,
				admin: me.value?._id!,
			})
		}
		isOpen.value = false
		selectedUsers.value = []
		groupName.value = ''
		resetSelectFiles()
	} catch (error) {
		$toast.error('Failed to create conversation')
		console.log(error)
	} finally {
		isLoading.value = false
	}
}

const selectUser = (userId: string) => {
	if (selectedUsers.value.includes(userId)) {
		selectedUsers.value = selectedUsers.value.filter((id) => id !== userId)
	} else {
		selectedUsers.value.push(userId)
	}
}
</script>
<template>
	<Dialog v-model:open="isOpen">
		<DialogTrigger>
			<IconMessageSquareDiff :size="20" @click.stop="isOpen = true" />
		</DialogTrigger>
		<DialogContent class="!bg-left-panel">
			<DialogHeader>
				<DialogClose />
				<DialogTitle>USERS</DialogTitle>
			</DialogHeader>

			<DialogDescription>Start a new chat</DialogDescription>

			<div v-if="renderedFiles" class="w-16 h-16 relative mx-auto">
				<NuxtImg
					:src="renderedFiles"
					fill
					alt="user image"
					class="rounded-full object-cover w-16 h-16"
					width="64"
					height="64"
				/>
			</div>

			<template v-if="selectedUsers.length > 1">
				<Input
					placeholder="Group Name"
					v-model="groupName"
					class="py-2 text-sm w-full rounded-lg shadow-sm !bg-gray-tertiary focus-visible:ring-transparent"
				/>
				<Button class="flex gap-2" @click="openSelectFiles">
					<IconImage :size="20" />
					Group Image
				</Button>
			</template>

			<div class="flex flex-col gap-3 overflow-auto max-h-60">
				<div
					v-for="user in users"
					:key="user._id"
					class="flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 transition-all ease-in-out duration-300"
					:class="{ 'bg-green-primary': selectedUsers.includes(user._id) }"
					@click="selectUser(user._id)"
				>
					<Avatar class="overflow-visible relative">
						<div
							v-if="user.isOnline"
							class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-foreground"
						/>

						<AvatarImage :src="user.image" class="rounded-full object-cover" />
						<AvatarFallback>
							<div class="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
						</AvatarFallback>
					</Avatar>

					<div class="w-full">
						<div class="flex items-center justify-between">
							<p class="text-md font-medium">{{ user.name || user.email.split('@')[0] }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-between">
				<Button @click="isOpen = false" variant="outline">Cancel</Button>
				<Button
					@click="handleCreateConversation"
					:disabled="
						selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || isLoading
					"
				>
					<div v-if="isLoading" class="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
					<span v-else>Create</span>
				</Button>
			</div>
		</DialogContent>
	</Dialog>
</template>

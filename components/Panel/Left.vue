<script lang="ts" setup>
const searchText = ref('')
const selectTypeSorted = ref<'a-z' | 'z-a'>('a-z')

const { isSignedIn } = useAuth()
const { conversations } = useGetDataInConvex()
const chatsStore = useChatsStore()

const searchConversations = computed(() => {
	if (searchText.value)
		return conversations.value.filter((conversation: any) => {
			const conversationName = conversation?.groupName || conversation?.name || 'Private Chat'
			return conversationName.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase())
		})
	return conversations.value
})

const sortedConversations = computed(() => {
	if (selectTypeSorted.value === 'a-z') {
		return searchConversations.value?.sort((a: any, b: any) =>
			(a?.groupName || a?.name)?.localeCompare(b?.groupName || b?.name)
		)
	}

	return searchConversations.value?.sort((a: any, b: any) =>
		(b?.groupName || b?.name)?.localeCompare(a?.groupName || a?.name)
	)
})

watch([searchConversations, () => chatsStore.selectedConversation], () => {
	const conversationIds = conversations.value?.map((conversation) => conversation._id)

	if (
		chatsStore.selectedConversation &&
		conversationIds &&
		!conversationIds.includes(chatsStore.selectedConversation._id)
	) {
		chatsStore.setSelectedConversation(null)
	}
})
</script>
<template>
	<div class="w-1/4 border-gray-600 border-r">
		<div class="sticky top-0 bg-left-panel z-10">
			<!-- Header -->
			<div class="flex justify-between bg-gray-primary p-3 items-center">
				<UserButton afterSignOutUrl="/sign-in" />

				<div class="flex items-center gap-3">
					<UserListDialog v-if="isSignedIn" />
					<ThemeSwitch />
				</div>
			</div>
			<div class="p-3 flex items-center">
				<!-- Search -->
				<div class="relative h-10 mx-3 flex-1">
					<IconSearch
						class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
						:size="18"
					/>
					<Input
						type="text"
						placeholder="Search or start a new chat"
						class="pl-10 py-2 text-sm w-full !rounded !shadow-sm !bg-gray-primary !focus-visible:ring-transparent"
						v-model="searchText"
					/>
				</div>

				<FilterDialog @sorted="selectTypeSorted = $event" />
			</div>
		</div>

		<!-- Chat List -->
		<div class="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
			<template v-if="sortedConversations && sortedConversations.length > 0">
				<Conversation
					v-for="conversation in sortedConversations"
					:key="conversation._id"
					:conversation="conversation"
				/>
			</template>

			<template v-else>
				<p class="text-center text-gray-500 text-sm mt-3">No conversations yet</p>
				<p class="text-center text-gray-500 text-sm mt-3">
					We understand {{ "you're" }} an introvert, but {{ "you've" }} got to start somewhere 😊
				</p>
			</template>
		</div>
	</div>
</template>

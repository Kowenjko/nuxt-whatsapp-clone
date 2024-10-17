<script lang="ts" setup>
const chatsStore = useChatsStore()

const conversationName = computed(
	() => chatsStore.selectedConversation?.groupName || chatsStore.selectedConversation?.name
)

const conversationImage = computed(
	() =>
		chatsStore.selectedConversation?.groupImage ||
		chatsStore.selectedConversation?.image ||
		'/placeholder.png'
)
const isGroup = computed(() => chatsStore.selectedConversation?.isGroup)
</script>
<template>
	<ChatPlaceHolder v-if="!chatsStore.selectedConversation" />
	<div v-else class="w-3/4 flex flex-col">
		<div class="w-full sticky top-0 z-50">
			<!-- Header -->
			<div class="flex justify-between bg-gray-primary p-3">
				<div class="flex gap-3 items-center">
					<Avatar>
						<AvatarImage :src="conversationImage" class="object-cover" />
						<AvatarFallback>
							<div class="animate-pulse !bg-gray-tertiary w-full h-full rounded-full" />
						</AvatarFallback>
					</Avatar>
					<div class="flex flex-col">
						<p>{{ conversationName }}</p>

						<GroupMembersDialog
							v-if="chatsStore.selectedConversation && isGroup"
							:selectedConversation="chatsStore.selectedConversation"
						/>
					</div>
				</div>

				<div class="flex items-center gap-7 mr-5">
					<nuxt-link to="/video-call" target="_blank">
						<IconVideo :size="23" />
					</nuxt-link>
					<button @click="chatsStore.setSelectedConversation(null)" type="button">
						<IconX :size="16" class="cursor-pointer" />
					</button>
				</div>
			</div>
		</div>
		<!-- CHAT MESSAGES -->
		<MessageContainer />

		<!-- INPUT -->
		<MessageInput />
	</div>
</template>

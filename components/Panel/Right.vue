<script lang="ts" setup>
const selectedConversation = null
const conversationName = 'John Doe'
</script>
<template>
	<ChatPlaceHolder v-if="selectedConversation" />
	<div v-else class="w-3/4 flex flex-col">
		<div class="w-full sticky top-0 z-50">
			<!-- Header -->
			<div class="flex justify-between bg-gray-primary p-3">
				<div class="flex gap-3 items-center">
					<Avatar>
						<AvatarImage src="/placeholder.png" class="object-cover" />
						<AvatarFallback>
							<div class="animate-pulse !bg-gray-tertiary w-full h-full rounded-full" />
						</AvatarFallback>
					</Avatar>
					<div class="flex flex-col">
						<p>{{ conversationName }}</p>
						<!-- {selectedConversation.isGroup && (
								<GroupMembersDialog selectedConversation={selectedConversation} />
							)} -->

						<GroupMembersDialog />
					</div>
				</div>

				<div class="flex items-center gap-7 mr-5">
					<nuxt-link to="/video-call" target="_blank">
						<IconVideo size="23" />
					</nuxt-link>
					<button @click="selectedConversation = null" type="button"></button>
					<IconX size="16" class="cursor-pointer" />
				</div>
			</div>
		</div>
		<!-- CHAT MESSAGES -->
		<MessageContainer />

		<!-- INPUT -->
		<MessageInput />
	</div>
</template>

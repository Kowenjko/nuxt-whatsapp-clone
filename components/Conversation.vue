<script lang="ts" setup>
import { formatDate } from '@/helpers'

const { conversation } = defineProps<{ conversation: any }>()

const conversationImage = computed(() => conversation?.groupImage || conversation?.image)
const conversationName = computed(
	() => conversation?.groupName || conversation?.name || 'Private Chat'
)
const lastMessage = computed(() => conversation.lastMessage)
const lastMessageType = computed(() => conversation.lastMessage.messageType)

const authUser = { _id: 'user1' }
const activeBgClass = false
</script>
<template>
	<div
		class="flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer"
		:class="{ 'bg-gray-tertiary': activeBgClass }"
		@click=""
	>
		<Avatar class="border border-gray-900 overflow-visible relative">
			<div
				v-if="conversation.isOnline"
				class="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground"
			/>

			<AvatarImage
				:src="conversationImage || '/placeholder.png'"
				class="object-cover rounded-full"
			/>
			<AvatarFallback>
				<div class="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
			</AvatarFallback>
		</Avatar>
		<div class="w-full">
			<div class="flex items-center">
				<h3 class="text-sm font-medium">{{ conversationName }}</h3>
				<span class="text-xs text-gray-500 ml-auto">
					{{ formatDate(lastMessage?._creationTime || conversation._creationTime) }}
				</span>
			</div>
			<p class="text-[12px] mt-1 text-gray-500 flex items-center gap-1">
				<MessageSeenSvg v-if="lastMessage?.sender === authUser?._id" />

				<IconUsers v-if="conversation.isGroup" size="16" />

				<span v-if="!lastMessage">Say Hi!</span>
				<template v-if="lastMessageType === 'text'">
					<span v-if="lastMessage?.content.length > 30">
						{{ lastMessage?.content.slice(0, 30) }}...
					</span>
					<span v-else>{{ lastMessage?.content }} </span>
				</template>
				<IconImage v-if="lastMessageType === 'image'" size="16" />
				<IconVideo v-if="lastMessageType === 'video'" size="16" />
			</p>
		</div>
	</div>
	<hr class="h-[1px] mx-10 bg-gray-primary" />
</template>

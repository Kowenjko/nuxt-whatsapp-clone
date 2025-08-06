<script lang="ts" setup>
import type { IMessage } from '@/types'

const { message, me } = defineProps<{ message: IMessage; me: any; previousMessage?: IMessage }>()

const open = ref(false)

const chatsStore = useChatsStore()

const date = new Date(message._creationTime)
const hour = date.getHours().toString().padStart(2, '0')
const minute = date.getMinutes().toString().padStart(2, '0')
const time = `${hour}:${minute}`

const isMember = computed(
	() => chatsStore.selectedConversation?.participants.includes(message.sender?._id) || false
)
const isGroup = computed(() => chatsStore.selectedConversation?.isGroup)
const fromMe = computed(() => message.sender?._id === me._id)
const fromAI = computed(() => message.sender?.name === 'ChatGPT')
const bgClass = computed(() =>
	fromMe.value
		? 'bg-green-chat'
		: !fromAI.value
			? 'bg-white dark:!bg-gray-primary'
			: 'bg-blue-500 text-white'
)
</script>
<template>
	<template v-if="!fromMe">
		<DateIndicator :message="message" :previousMessage="previousMessage" />
		<div class="flex gap-1 w-2/3 last:mb-4">
			<ChatBubbleAvatar v-if="!isGroup || !fromAI" :isMember="isMember" :message="message" />
			<div
				:class="`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`"
			>
				<MessageOtherIndicator v-if="!fromAI" />
				<IconBot v-if="fromAI" :size="16" class="absolute bottom-[2px] left-2" />
				<ChatAvatarActions :message="message" :me="me" />
				<MessageRenderContent :message="message" @handle-click="open = true" />
				<ImageDialog v-if="open" :src="message.content" v-model:open="open" />
				<MessageTime :time="time" :fromMe="fromMe" />
			</div>
		</div>
	</template>
	<template v-else>
		<DateIndicator :message="message" :previousMessage="previousMessage" />

		<div class="flex gap-1 w-2/3 ml-auto last:mb-4">
			<div
				:class="`flex  z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative ${bgClass}`"
			>
				<MessageSelfIndicator />
				<MessageRenderContent :message="message" @handle-click="open = true" />
				<ImageDialog v-if="open" :src="message.content" v-model:open="open" />
				<MessageTime :time="time" :fromMe="fromMe" />
			</div>
		</div>
	</template>
</template>

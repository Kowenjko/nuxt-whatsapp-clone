<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

const msgText = ref('')

const openEmoji = ref(false)
const emojiEl = useTemplateRef('emojiRef')

const { sendTextMessage } = useMutationInConvex()
const { tokenIdentifier } = useGetTokenIdentifier()

const { me } = useGetDataInConvex()
const chatsStore = useChatsStore()

const { $toast } = useNuxtApp()
const colorMode = useColorMode()

const handleSendMessage = async () => {
	try {
		await sendTextMessage({
			content: msgText.value,
			conversation: chatsStore.selectedConversation!._id,
			sender: me.value?._id,
			tokenIdentifier,
		})
		msgText.value = ''
	} catch (error) {
		// @ts-ignore
		$toast.error(error?.message)
		console.error(error)
	}
}

onClickOutside(emojiEl, (event) => {
	openEmoji.value = false
})

const onSelectEmoji = (emoji: any) => (msgText.value += emoji.i)
</script>
<template>
	<div class="bg-gray-primary p-2 flex gap-4 items-center">
		<div class="relative flex gap-2 ml-2">
			<!-- EMOJI PICKER WILL GO HERE -->
			<div ref="emojiRef">
				<NuxtEmojiPicker
					v-if="openEmoji"
					:hide-search="false"
					:theme="colorMode"
					@select="onSelectEmoji"
					:style="{ position: 'absolute', bottom: '2.5rem', left: '1rem', zIndex: 50 }"
				/>
				<button @click="openEmoji = !openEmoji" type="button">
					<IconLaugh class="text-gray-600 dark:text-gray-400" />
				</button>
			</div>
			<IconPlus class="text-gray-600 dark:text-gray-400" />
		</div>

		<form class="w-full flex gap-3" @submit.prevent="handleSendMessage">
			<div class="flex-1">
				<Input
					type="text"
					placeholder="Type a message"
					class="py-2 text-sm w-full rounded-lg shadow-sm !bg-gray-tertiary focus-visible:ring-transparent"
					v-model="msgText"
				/>
			</div>
			<div class="mr-4 flex items-center gap-3">
				<Button
					v-if="msgText.length > 0"
					type="submit"
					size="sm"
					class="bg-transparent text-foreground hover:bg-transparent"
				>
					<IconSend />
				</Button>

				<Button
					v-else
					type="submit"
					size="sm"
					class="bg-transparent text-foreground hover:bg-transparent"
				>
					<IconMic />
				</Button>
			</div>
		</form>
	</div>
</template>

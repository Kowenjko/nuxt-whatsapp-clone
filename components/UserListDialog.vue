<script lang="ts" setup>
import { users } from '@/data/db'

const selectedUsers = ref<string[]>([])
const groupName = ref('')
const isLoading = ref(false)
const selectedImage = ref(null)
const renderedImage = ref('')

// const dialogCloseRef = useTemplateRef('dialogClose')
const imgRef = useTemplateRef('img')

const selectUser = (userId: string) => {
	if (selectedUsers.value.includes(userId)) {
		selectedUsers.value = selectedUsers.value.filter((id) => id !== userId)
	} else {
		selectedUsers.value.push(userId)
	}
}
</script>
<template>
	<Dialog>
		<DialogTrigger>
			<IconMessageSquareDiff :size="20" />
		</DialogTrigger>
		<DialogContent class="!bg-left-panel">
			<DialogHeader>
				<!-- <DialogClose /> -->
				<DialogTitle>USERS</DialogTitle>
			</DialogHeader>

			<DialogDescription>Start a new chat</DialogDescription>

			<div v-if="renderedImage" class="w-16 h-16 relative mx-auto">
				<NuxtImg
					:src="renderedImage"
					fill
					alt="user image"
					class="rounded-full object-cover"
					width="64"
					height="64"
				/>
			</div>

			<template v-if="selectedUsers.length > 1">
				<input placeholder="Group Name" ref="img" />
				<Button class="flex gap-2">
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
				<Button variant="outline">Cancel</Button>
				<Button
					:disabled="
						selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || isLoading
					"
				>
					<!-- spinner -->

					<div v-if="isLoading" class="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
					<span v-else>Create</span>
				</Button>
			</div>
		</DialogContent>
	</Dialog>
</template>

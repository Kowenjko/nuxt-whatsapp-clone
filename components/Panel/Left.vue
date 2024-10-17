<script lang="ts" setup>
const { isSignedIn } = useAuth()
const { conversations } = useGetDataInConvex()
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
					/>
				</div>
				<IconListFilter class="cursor-pointer" />
			</div>
		</div>

		<!-- Chat List -->
		<div class="my-3 flex flex-col gap-0 max-h-[80%] overflow-auto">
			<template v-if="conversations && conversations.length > 0">
				<Conversation
					v-for="conversation in conversations"
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

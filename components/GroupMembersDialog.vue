<script lang="ts" setup>
import { users } from '@/data/db'
</script>
<template>
	<Dialog>
		<DialogTrigger>
			<p class="text-xs text-muted-foreground text-left">See members</p>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle class="my-2">Current Members</DialogTitle>
				<DialogDescription>
					<div class="flex flex-col gap-3">
						<div v-for="user in users" :key="user._id" class="flex gap-3 items-center p-2 rounded">
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
								<div class="flex items-center gap-2">
									<h3 class="text-md font-medium">{{ user.name || user.email.split('@')[0] }}</h3>
									<IconCrown v-if="user.admin" size="16" class="text-yellow-400" />
								</div>
							</div>
						</div>
					</div>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>

<script lang="ts" setup></script>
<template>
	<div class="w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10">
		<div class="flex flex-col items-center w-full justify-center py-10 gap-4">
			<NuxtImg src="/desktop-hero.png" alt="Hero" width="320" height="188" format="webp" />
			<p class="text-3xl font-extralight mt-5 mb-2">Download WhatsApp for Windows</p>
			<p class="w-1/2 text-center text-gray-primary text-sm text-muted-foreground">
				Make calls, share your screen and get a faster experience when you download the Windows app.
			</p>

			<Button class="rounded-full my-5 bg-green-primary hover:bg-green-secondary">
				Get from Microsoft Store
			</Button>
		</div>
		<p
			class="w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1"
		>
			<IconLock :size="10" /> Your personal messages are end-to-end encrypted
		</p>
	</div>
</template>

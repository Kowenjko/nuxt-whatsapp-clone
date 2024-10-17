<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import { MoonIcon, SunIcon } from '@radix-icons/vue'

const colorMode = useColorMode()
</script>
<template>
	<DropdownMenu>
		<DropdownMenuTrigger asChild class="bg-transparent relative">
			<Button variant="outline" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="bg-gray-primary">
			<DropdownMenuItem @click="colorMode = 'light'"> Light </DropdownMenuItem>
			<DropdownMenuItem @click="colorMode = 'dark'"> Dark </DropdownMenuItem>
			<DropdownMenuItem @click="colorMode = 'auto'"> System </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

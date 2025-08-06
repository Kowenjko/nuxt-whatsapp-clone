<script lang="ts" setup>
const emit = defineEmits<{ sorted: [typeof: 'a-z' | 'z-a'] }>()

const selectType = ref<'a-z' | 'z-a'>('a-z')

watch(selectType, (value) => emit('sorted', value))
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<IconListFilter
				class="cursor-pointer transition-all"
				:class="{ 'rotate-180': selectType === 'z-a' }"
			/>
		</DropdownMenuTrigger>

		<DropdownMenuContent class="dark:bg-left-panel">
			<DropdownMenuItem @click="selectType = 'a-z'">
				<IconArrowUpAz :size="20" class="mr-1" />
				Name
			</DropdownMenuItem>
			<DropdownMenuItem @click="selectType = 'z-a'">
				<IconArrowDownZa :size="20" class="mr-1" />
				Name
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

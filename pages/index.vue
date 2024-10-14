<script lang="ts" setup>
import { useConvexQuery } from '@convex-vue/core'
import { api } from '@/convex/_generated/api'

const { data, isLoading } = useConvexQuery(api.users.getUsers, {})
console.log(data.value)
</script>

<template>
	<PanelLeft />
	<PanelRight />
</template>

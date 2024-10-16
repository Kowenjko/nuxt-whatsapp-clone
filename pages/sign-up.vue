<script lang="ts" setup>
definePageMeta({ layout: 'auth', middleware: 'guest', auth: { authenticatedRedirectUrl: '/' } })
</script>

<template>
	<SignUp path="/sign-up" forceRedirectUrl="/" sign-in-url="/sign-in" />
</template>

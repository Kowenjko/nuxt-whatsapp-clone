<script lang="ts" setup>
definePageMeta({ layout: 'auth', middleware: 'guest', auth: { authenticatedRedirectUrl: '/' } })
</script>

<template>
	<SignIn path="/sign-in" forceRedirectUrl="/" signUpUrl="/sign-up" />
</template>

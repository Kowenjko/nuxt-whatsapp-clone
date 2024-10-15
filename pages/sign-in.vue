<script lang="ts" setup>
definePageMeta({ layout: 'auth' })
</script>

<template>
	<SignIn path="/sign-in" forceRedirectUrl="/" signUpUrl="/sign-up" />
</template>

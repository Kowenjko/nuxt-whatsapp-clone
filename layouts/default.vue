<script lang="ts" setup></script>

<template>
	<main class="m-5">
		<div class="flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel">
			<div class="fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />
			<slot />
		</div>
	</main>
</template>

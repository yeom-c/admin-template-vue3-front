<script setup>
import { useAppStore } from '@/stores/app'
import AppProvider from '@/components/AppProvider.vue'

const appStore = useAppStore()

const handleResize = (store) => {
	store.screen.width = window.innerWidth
	store.screen.height = window.innerHeight
	store.isDesktop = window.innerWidth >= store.responsiveWidth.lg
}

window.addEventListener('resize', () => handleResize(appStore))
</script>

<template>
	<AppProvider>
		<router-view />
	</AppProvider>
</template>

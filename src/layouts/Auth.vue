<script setup>
import { watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { NGrid, NGridItem, NSpace, useNotification } from 'naive-ui'

const appStore = useAppStore()
const notification = useNotification()
watch(appStore.errorMessages, (msgs) => {
	msgs.forEach((msg) =>
		notification['error']({
			content: '요청 처리 실패',
			meta: msg
		})
	)

	// clear error messages
	msgs.length = 0
})
</script>

<template>
	<div
		:class="appStore.screen.width >= 1024 ? 'quasar-logo-256' : 'quasar-logo-256-white'"
		style="width: 220px; height: 58px; position: absolute; top: 1rem; left: 1rem"
	/>
	<n-grid cols="5" item-responsive style="height: 100vh">
		<n-grid-item class="bg-slate-100" span="0 1024:3" />
		<n-grid-item class="bg-primary" span="5 1024:2">
			<n-space justify="center" align="center" vertical style="height: 100vh">
				<router-view />
			</n-space>
		</n-grid-item>
	</n-grid>
</template>

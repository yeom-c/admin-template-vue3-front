<script setup>
import { h } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { NSpace, NBreadcrumb, NBreadcrumbItem, NButton, NIcon, NDropdown, NAvatar } from 'naive-ui'
import { Menu as MenuIcon } from '@vicons/carbon'
import { renderIcon } from '@/utils/common'

const appStore = useAppStore()
const userStore = useUserStore()

const renderMenuHeader = () => {
	return h(
		'div',
		{
			class: 'text-slate-600',
			style: 'display: flex; flex-flow: column nowrap; padding: 0.25rem 0.75rem;'
		},
		[
			h(
				'span',
				{ style: 'font-size: 16px; font-weight: bold' },
				{ default: () => userStore.user.profile?.name }
			),
			h('span', null, { default: () => '부서명은 여기' })
		]
	)
}

const options = [
	{
		label: '프로필',
		key: 'profile',
		icon: renderIcon('User')
	},
	{
		label: '로그아웃',
		key: 'sign-out',
		icon: renderIcon('Logout')
	}
]
if (appStore.screen.width <= appStore.responsiveWidth.sm) {
	options.unshift({
		type: 'render',
		key: 'header',
		render: renderMenuHeader
	})
}

const handleUserMenu = (key) => {
	if (key === 'sign-out') {
		userStore.signOut()
	}
}
</script>

<template>
	<div class="header-opacity"></div>
	<n-space
		justify="space-between"
		align="center"
		:wrap="false"
		class="text-slate-600 fixed-header bg-white rounded-box box-shadow"
	>
		<n-space align="center" :wrap="false" :size="0">
			<div v-if="!appStore.isDesktop" style="margin-right: 1rem">
				<n-button
					text
					style="font-size: 22px"
					@click="() => (appStore.showSidebar = !appStore.showSidebar)"
				>
					<n-icon><menu-icon /></n-icon>
				</n-button>
			</div>
			<n-space vertical :size="0">
				<n-breadcrumb>
					<n-breadcrumb-item
						v-for="(breadcrumb, index) in appStore.breadcrumb"
						:key="`${breadcrumb.path}-${index}`"
					>
						<span v-if="index + 1 === appStore.breadcrumb.length">
							{{ breadcrumb.title }}
						</span>
						<router-link v-else :to="{ path: breadcrumb.path }">
							{{ breadcrumb.title }}
						</router-link>
					</n-breadcrumb-item>
				</n-breadcrumb>
				<span style="font-size: 18px">{{ appStore.pageTitle }}</span>
			</n-space>
		</n-space>
		<n-space justify="end" align="center" :wrap="false" :size="0">
			<n-space
				v-if="appStore.screen.width > appStore.responsiveWidth.sm"
				vertical
				:size="0"
				style="text-align: right; margin-right: 1rem"
			>
				<span style="font-size: 16px; font-weight: bold">{{ userStore.user.profile?.name }}</span>
				<span>부서명은 여기</span>
			</n-space>
			<n-dropdown
				:options="options"
				placement="bottom-end"
				size="large"
				trigger="click"
				style="width: 200px"
				@select="handleUserMenu"
			>
				<n-button text>
					<n-avatar>Q</n-avatar>
				</n-button>
			</n-dropdown>
		</n-space>
	</n-space>
</template>

<style lang="scss" scoped>
.header-opacity {
	position: absolute;
	top: 0;
	z-index: 9;
	margin: 0 1.5rem;
	width: calc(100% - 3rem);
	height: 100px;
	display: block;
	background: linear-gradient(
		180deg,
		hsla(210, 40%, 96.1%, 0.95) 44%,
		hsla(210, 40%, 96.1%, 0.46) 73%,
		hsla(0, 0%, 100%, 0)
	);
}

.fixed-header {
	position: absolute;
	top: 0;
	z-index: 10;
	margin: 1.5rem 2rem 0 2rem;
	padding: 1rem;
	width: calc(100% - 6rem);
	height: 50px;
}
</style>

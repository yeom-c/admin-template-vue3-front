import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => {
		const responsiveWidth = {
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536
		}
		const screen = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		const appName = import.meta.env.VITE_APP_NAME || 'Admin Template Vue3 Front'
		const pageTitle = ''
		const breadcrumb = []
		const isDesktop = window.innerWidth >= responsiveWidth.lg
		const hideSidebar = false
		const showSidebar = false
		const selectedMenu = ''
		const errorMessages = []

		return {
			responsiveWidth,
			screen,
			appName,
			pageTitle,
			breadcrumb,
			isDesktop,
			hideSidebar,
			showSidebar,
			selectedMenu,
			errorMessages
		}
	},
	actions: {
		initBreadcrumb(route) {
			this.pageTitle = ''
			this.breadcrumb = []
			route.matched.forEach((match) => {
				this.pageTitle = match.meta.title
				this.addBreadcrumb(match.meta.title, match.path)
			})
		},
		addBreadcrumb(title, path = null) {
			this.breadcrumb.push({
				title,
				path
			})
		},
		pushErrorMessage(message) {
			this.errorMessages.push(message)
		}
	}
})

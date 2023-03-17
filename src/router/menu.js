export default {
	component: () => import('@/components/RouterView.vue'),
	path: '/menu',
	redirect: { name: 'SubMenu' },
	name: 'Menu',
	meta: {
		title: '메뉴',
		icon: 'ExpandCategories'
	},
	children: [
		{
			component: () => import('@/views/menu/SubMenu.vue'),
			path: '/menu/submenu',
			name: 'SubMenu',
			meta: {
				title: '서브메뉴-1'
			}
		},
		{
			component: () => import('@/views/menu/CreateMenu.vue'),
			path: '/menu/submenu/create',
			name: 'CreateSubMenu',
			meta: {
				title: '서브메뉴 생성',
				hidden: true,
				selectedKey: '/menu/submenu'
			}
		},
		{
			component: () => import('@/components/RouterView.vue'),
			path: '/menu/submenu-2',
			redirect: { name: 'SubMenu2-1' },
			name: 'SubMenu2',
			meta: {
				title: '서브메뉴-2'
			},
			children: [
				{
					component: () => import('@/views/menu/SubMenu2.vue'),
					path: '/menu/submenu-2/submenu',
					name: 'SubMenu2-1',
					meta: {
						title: '서브메뉴-2-1'
					}
				}
			]
		}
	]
}

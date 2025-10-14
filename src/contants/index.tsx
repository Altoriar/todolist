import type { Menu } from '@/types';

export const BaseMenus: Menu[] = [
	{
		id: 'day_todo',
		path: '/day_todo',
		icon: 'CiLight',
		title: 'Day Todo',
	},
	{
		id: 'recent_todo',
		path: '/recent_todo',
		icon: 'CiSquareCheck',
		title: 'Recent Todo',
	},
	{
		id: 'overview',
		path: '/overview',
		icon: 'CiBoxList',
		title: 'Overview',
	},
	{
		id: 'agent_box',
		path: '/agent_box',
		icon: 'CiBoxes',
		title: 'Agent Box',
	},
	{
		id: 'search',
		path: '/search',
		icon: 'CiSearch',
		title: 'Search',
	},
	{
		id: 'setting',
		path: '/setting',
		icon: 'CiSettings',
		title: 'Setting',
	},
];

export const CategoryMenus: Menu[] = [
	{
		id: 'favorite',
		path: '/favorite',
		icon: 'CiStar',
		title: 'Favorite',
	},
	{
		id: 'life',
		path: '/life',
		icon: 'CiStar',
		title: 'Life',
	},
	{
		id: 'work',
		path: '/work',
		icon: 'CiStar',
		title: 'Work',
	},
	{
		id: 'study',
		path: '/study',
		icon: 'CiStar',
		title: 'Study',
	},
];

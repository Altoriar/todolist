import type { Theme } from '@/types';
import { makeAutoObservable } from 'mobx';

export const themes: Theme[] = [
	{
		name: 'blue',
		title: 'blue',
	},
	{
		name: 'green',
		title: 'green',
	},
	{
		name: 'yellow',
		title: 'yellow',
	},
	{
		name: 'red',
		title: 'red',
	},
	{
		name: 'skyblue',
		title: 'skyblue',
	},
	{
		name: 'dark',
		title: 'dark',
	},
	{
		name: 'light',
		title: 'light',
	},
];

class RootStore {
	theme: Theme = {
		name: 'green',
		title: 'maers green',
	};

	constructor() {
		makeAutoObservable(this);
	}

	changeTheme(theme: Theme) {
		this.theme = theme;
	}
}

export const rootStore = new RootStore();

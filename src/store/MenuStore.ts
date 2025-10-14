import { BaseMenus, CategoryMenus } from '@/contants';
import type { Menu } from '@/types';
import { storage } from '@/utils';
import { autorun, makeAutoObservable } from 'mobx';
// import {
// 	CiBoxes,
// 	CiBoxList,
// 	CiLight,
// 	CiSearch,
// 	CiSettings,
// 	CiSquareCheck,
// 	CiStar,
// } from 'react-icons/ci';

class MenuStore {
	baseMenus: Menu[] = BaseMenus;

	categoryMenus: Menu[] = CategoryMenus;

	constructor() {
		makeAutoObservable(this);

		autorun(() => {
			storage.set('category_menus', this.categoryMenus);
		});
	}

	addCategoryMenu() {}

	removeCategoryMenu() {}

	editCategoryMenu() {}
}

export const menuStore = new MenuStore();

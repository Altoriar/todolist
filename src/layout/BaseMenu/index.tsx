import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import {
	CiBoxes,
	CiBoxList,
	CiLight,
	CiSearch,
	CiSettings,
	CiSquareCheck,
} from 'react-icons/ci';

import './index.less';
import type { Menu } from '@/types';

const menus: Menu[] = [
	{
		id: 'day_todo',
		path: '/day_todo',
		theme: 'success',
		icon: <CiLight />,
		title: 'Day Todo',
	},
	{
		id: 'recent_todo',
		path: '/recent_todo',
		icon: <CiSquareCheck />,
		title: '最近代办',
	},
	{
		id: 'overview',
		path: '/overview',
		icon: <CiBoxList />,
		title: '日程概览',
	},
	{
		id: 'agent_box',
		path: '/agent_box',
		icon: <CiBoxes />,
		title: '代办箱',
	},
	{
		id: 'search',
		path: '/search',
		icon: <CiSearch />,
		title: '搜索',
	},
	{
		id: 'setting',
		path: '/setting',
		icon: <CiSettings />,
		title: '设置',
	},
];

export const BaseMenu: FC = () => {
	const navigate = useNavigate();

	const onJump = (path: string) => {
		navigate(path);
	};

	return (
		<div className='base-menu'>
			<Stack className='menu-buttons' gap={4}>
				{menus.map((menu) => (
					<Button
						className='menu-button'
						key={menu.id}
						variant={menu.theme || 'light'}
						onClick={() => onJump(menu.path)}
					>
						<span className='menu-icon'>{menu?.icon}</span>

						{menu.title}
					</Button>
				))}
			</Stack>
		</div>
	);
};

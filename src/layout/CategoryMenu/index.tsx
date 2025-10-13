import type { Menu } from '@/types';
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import { CiStar } from 'react-icons/ci';

import './index.less';

const menus: Menu[] = [
	{
		id: 'favorite',
		path: '/favorite',
		icon: <CiStar />,
		title: '收藏',
	},
	{
		id: 'life',
		path: '/life',
		icon: <CiStar />,
		title: '生活',
	},
	{
		id: 'job',
		path: '/job',
		icon: <CiStar />,
		title: '工作',
	},
	{
		id: 'study',
		path: '/study',
		icon: <CiStar />,
		title: '学习',
	},
];

export const CategoryMenu: FC = () => {
	const navigate = useNavigate();

	const onJump = (path: string) => {
		navigate(path);
	};

	return (
		<div className='catetory-menu'>
			<Stack gap={4} className='menu-buttons'>
				{menus.map((menu) => (
					<Button
						className='menu-button'
						key={menu.id}
						variant={menu.theme || 'light'}
						onClick={() => onJump(menu.path)}
					>
						<span className='menu-icon'>{menu.icon}</span>
						{menu.title}
					</Button>
				))}
			</Stack>
			<Link to='/todo'>catetory</Link>
		</div>
	);
};

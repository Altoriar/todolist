import type { ElementType, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';

import './index.less';
import { observer } from 'mobx-react-lite';
import * as CiIcon from 'react-icons/ci';
import { menuStore } from '@/store/MenuStore';

export const BaseMenu: FC = observer(() => {
	const { baseMenus: menus } = menuStore;

	const navigate = useNavigate();
	const location = useLocation();

	const onJump = (path: string) => {
		navigate(path);
	};

	const getTheme = (path: string) => {
		return location.pathname === path ? 'success' : 'light';
	};

	return (
		<div className='base-menu'>
			<Stack className='menu-buttons' gap={4}>
				{menus.map((menu) => {
					const IconCompnent = (
						CiIcon as Record<string, ElementType>
					)[menu.icon];
					return (
						<Button
							className='menu-button'
							key={menu.id}
							variant={getTheme(menu.path)}
							onClick={() => onJump(menu.path)}
						>
							<span className='menu-icon'>
								{IconCompnent ? <IconCompnent /> : null}
							</span>

							{menu.title}
						</Button>
					);
				})}
			</Stack>
		</div>
	);
});

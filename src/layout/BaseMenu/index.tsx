import type { ElementType, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Stack } from 'react-bootstrap';

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
		<Container className='p-0'>
			<Stack gap={4}>
				{menus.map((menu) => {
					const IconCompnent = (
						CiIcon as Record<string, ElementType>
					)[menu.icon];
					return (
						<Button
							className='d-flex align-items-center justify-content-start gap-3 flex-grow-1'
							key={menu.id}
							variant={getTheme(menu.path)}
							onClick={() => onJump(menu.path)}
						>
							{IconCompnent ? (
								<IconCompnent className='d-flex fs-4' />
							) : null}

							{menu.title}
						</Button>
					);
				})}
			</Stack>
		</Container>
	);
});

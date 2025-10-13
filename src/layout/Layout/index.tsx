import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';

import { BaseMenu } from '../BaseMenu';
import { CategoryMenu } from '../CategoryMenu';

import './index.less';
import { CiMenuKebab } from 'react-icons/ci';

export const Layout: FC = () => {
	return (
		<div className='layout'>
			<Stack gap={4} className='layout-aside'>
				<Button className='header-button' variant='success'>
					<span>Todo List</span>
					<span className='header-button-icon'>
						<CiMenuKebab />
					</span>
				</Button>
				<Stack className='layout-aside-nav' gap={4}>
					<BaseMenu />
					<CategoryMenu />
				</Stack>
			</Stack>

			<div className='layout-main'>
				<Outlet />
			</div>
		</div>
	);
};

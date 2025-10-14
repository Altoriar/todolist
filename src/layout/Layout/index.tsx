import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Card, Stack } from 'react-bootstrap';

import { BaseMenu } from '../BaseMenu';
import { CategoryMenu } from '../CategoryMenu';
import { CiMenuKebab } from 'react-icons/ci';

import './index.less';

export const Layout: FC = () => {
	return (
		<div className='layout'>
			<Card className='layout-menus'>
				<Card.Body>
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
				</Card.Body>
			</Card>

			<Card className='layout-main'>
				<Card.Body>
					<Outlet />
				</Card.Body>
			</Card>
		</div>
	);
};

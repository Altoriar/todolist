import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Card, Container, Stack } from 'react-bootstrap';

import { BaseMenu } from '../BaseMenu';
import { CategoryMenu } from '../CategoryMenu';
import { CiMenuKebab } from 'react-icons/ci';

export const Layout: FC = () => {
	return (
		<Container
			style={{ height: 'calc(100vh - 128px)' }}
			className='d-flex rounded'
		>
			<Card className='me-4 p-2'>
				<Card.Body>
					<Stack gap={4} className='d-flex flex-column mw-240'>
						<Button
							className='d-flex align-items-center justify-content-between'
							variant='success'
						>
							Todo List
							<CiMenuKebab />
						</Button>
						<Stack gap={4}>
							<BaseMenu />
							<CategoryMenu />
						</Stack>
					</Stack>
				</Card.Body>
			</Card>

			<Card className='flex-grow-1 overflow-y-auto'>
				<Card.Body>
					<Outlet />
				</Card.Body>
			</Card>
		</Container>
	);
};

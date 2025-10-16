import { useEffect, type FC } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { rootStore, themes } from '@/store';
import type { Theme } from '@/types';
import { observer } from 'mobx-react-lite';

export const Header: FC = observer(() => {
	const onChangeTheme = (theme: Theme) => {
		rootStore.changeTheme(theme);
	};

	useEffect(() => {
		document.body.setAttribute('data-bs-theme', rootStore.theme.name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rootStore.theme.name]);

	return (
		<Navbar expand='lg' className='bg-body-tertiary mb-4 mt-4'>
			<Container>
				<Navbar.Brand className='title'>Todo List</Navbar.Brand>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavDropdown
							id='basic-nav-dropdown'
							title={rootStore.theme.title}
						>
							{themes.map((theme) => (
								<NavDropdown.Item
									key={theme.name}
									onClick={() => onChangeTheme(theme)}
								>
									{theme.title}
								</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
});

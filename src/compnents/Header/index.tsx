import type { FC } from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';

import './index.less';

export const Header: FC = () => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Row>
					<Navbar.Brand className='title'>Todo清单</Navbar.Brand>
				</Row>
			</Container>
		</Navbar>
	);
};

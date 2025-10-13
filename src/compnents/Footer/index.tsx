import type { FC } from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';

import './index.less';

export const Footer: FC = () => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Row>Altoriar</Row>
				<Row>版权所有 @xxx</Row>
				<Row>jsakldfj</Row>
			</Container>
		</Navbar>
	);
};

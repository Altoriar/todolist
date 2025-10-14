import type { FC } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';

import './index.less';

export const Footer: FC = () => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container className='footer'>
				<Row className='footer-row'>
					<Col>Author: Altoriar</Col>
					<Col>Copyright owner @Altoriar</Col>
					<Col>Version: v0.0.1</Col>
				</Row>
			</Container>
		</Navbar>
	);
};

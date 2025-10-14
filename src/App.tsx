import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';

import { Layout } from '@/layout/Layout';
import { Header } from '@/compnents/Header';
import { Container } from 'react-bootstrap';

const App: FC = () => {
	return (
		<Container>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Layout />}>
						{routes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
						))}
					</Route>
				</Routes>
			</Router>
		</Container>
	);
};

export default App;

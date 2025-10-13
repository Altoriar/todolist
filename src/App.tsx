import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';

import { Layout } from '@/layout/Layout';
import { Header } from '@/compnents/Header';
import { Footer } from '@/compnents/Footer';

const App: FC = () => {
	return (
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
			<Footer />
		</Router>
	);
};

export default App;

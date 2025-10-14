import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 react-bootstrap 样式
import 'react-datepicker/dist/react-datepicker.css'; // 引入react-datepicker 样式

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

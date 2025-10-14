import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { RecentTodo } from '@/pages/RecentTodo';
import { DayTodo } from '@/pages/DayTodo';
import { Overview } from '@/pages/Overview';
import { AgentBox } from '@/pages/AgentBox';
import { Search } from '@/pages/Search';
import { Setting } from '@/pages/Settting';
import { NotFound } from '@/pages/NotFound';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to='/home' />,
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/day_todo',
		element: <DayTodo />,
	},
	{
		path: '/recent_todo',
		element: <RecentTodo />,
	},
	{
		path: '/overview',
		element: <Overview />,
	},
	{
		path: '/agent_box',
		element: <AgentBox />,
	},
	{
		path: '/search',
		element: <Search />,
	},
	{
		path: '/setting',
		element: <Setting />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

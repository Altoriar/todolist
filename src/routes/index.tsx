import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { TodoList } from '@/pages/Todo/TodoList';
import { RecentTodo } from '@/pages/RecentTodo';
import { DayTodo } from '@/pages/DayTodo';

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
		path: 'day_todo',
		element: <DayTodo />,
	},
	{
		path: 'recent_todo',
		element: <RecentTodo />,
	},
	{
		path: '/todo',
		element: <TodoList />,
	},
];

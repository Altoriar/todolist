import type { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { todoStore } from '@/store/TodoStore';

import { TodoItem } from './TodoItem';

export const TodoList: FC = observer(() => {
	const { todos } = todoStore;

	return (
		<div className='todo-list'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
});

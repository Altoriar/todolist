import type { FC } from 'react';
import type { Todo } from '@/store/TodoStore';
import { Button } from 'react-bootstrap';

interface Props {
	todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
	const { title, content } = todo;

	return (
		<div className='todo-item'>
			<h3>{title}</h3>
			<h5>{content}</h5>
			<Button variant='success'>完成</Button>
		</div>
	);
};

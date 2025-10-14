import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, ListGroup } from 'react-bootstrap';
import { CiSquareCheck } from 'react-icons/ci';
import { isEmpty } from 'lodash';

import type { Todo } from '@/store/TodoStore';
import { TodoItem } from './Item';

import './index.less';

interface Props {
	todos: Todo[];
	setIsShow: (isShow: boolean) => void;
	setCurTodo: (todo: Todo) => void;
	onComplete: (id: string) => void;
}

export const TodoList: FC<Props> = observer(
	({ todos, setIsShow, setCurTodo, onComplete }) => {
		return (
			<ListGroup className='todo-list'>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						setIsShow={setIsShow}
						setCurTodo={setCurTodo}
						onComplete={onComplete}
					/>
				))}

				{isEmpty(todos) ? (
					<Container className='no-todo'>
						<CiSquareCheck className='not-found-icon' />
						There is no todo for now.
					</Container>
				) : null}
			</ListGroup>
		);
	}
);

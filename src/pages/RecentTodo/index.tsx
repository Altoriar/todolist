import { useRef, useState, type FC } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { todoStore, type Todo } from '@/store/TodoStore';

import { TodoList } from '@/compnents/TodoList';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { TodoModal, type TodoModalRef } from '@/compnents/TodoModal';
import { observer } from 'mobx-react-lite';

export const RecentTodo: FC = observer(() => {
	const { todos } = todoStore;
	const todoModalRef = useRef<TodoModalRef>(null);

	const [todoName, setTodoName] = useState('');

	const onAddQuickly = (e: React.KeyboardEvent) => {
		if (todoName.trim() === '') return;

		if (e.key === 'Enter') {
			const newTodo: Todo = {
				id: uuidv4(),
				title: todoName.trim(),
				completed: false,
				createTime: moment().unix(),
				modifyTime: moment().unix(),
			};

			todoStore.addTodo(newTodo);
			setTodoName('');
		}
	};

	return (
		<Container className='w-100 p-2'>
			<Row className='mb-2'>
				<Col>
					<InputGroup>
						<Form.Control
							type='text'
							placeholder='add todo quickly'
							value={todoName}
							onChange={(e) => {
								const { value } = e.target;
								setTodoName(value);
							}}
							onKeyUp={onAddQuickly}
						/>
					</InputGroup>
				</Col>
				<Col>
					<Button
						variant='success'
						onClick={() => todoModalRef.current?.show()}
					>
						Add Todo
					</Button>
				</Col>
			</Row>

			<TodoList todos={todos} />
			<TodoModal ref={todoModalRef} />
		</Container>
	);
});

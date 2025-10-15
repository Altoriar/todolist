import { useState, type FC } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { todoStore, type Todo } from '@/store/TodoStore';
import { observer } from 'mobx-react-lite';

import { formatDate } from '@/utils';
import { AddTodo } from './AddTodo';
import { TodoList } from '@/compnents/TodoList';

export const RecentTodo: FC = observer(() => {
	const { todos } = todoStore;

	const [curTodo, setCurTodo] = useState<Todo>();
	const [isShow, setIsShow] = useState(false);

	const onComplete = (id: string) => {
		todoStore.completeTodo(id);
	};

	return (
		<Container className='w-100 p-2'>
			<AddTodo />
			<TodoList
				todos={todos}
				setIsShow={setIsShow}
				setCurTodo={setCurTodo}
				onComplete={onComplete}
				onDrapUpdate={(newTodos) => todoStore.updateTodos(newTodos)}
			/>

			<Modal
				backdrop='static'
				show={isShow}
				onHide={() => setIsShow(false)}
			>
				<Modal.Body>
					<Row>
						<Col>Are you sure you want to delete Todo?</Col>
					</Row>
					<Row>
						<Col>Todo Title: {curTodo?.title}</Col>
					</Row>
					<Row>
						<Col>Description: {curTodo?.title}</Col>
					</Row>
					<Row>
						<Col>
							Status:{' '}
							{curTodo?.completed ? 'completed' : 'incomplete'}
						</Col>
					</Row>
					<Row>
						{curTodo?.deadline ? (
							<Col>Deadline: {formatDate(curTodo?.deadline)}</Col>
						) : null}
					</Row>
					<Row>
						<Col>
							Create Time: {formatDate(curTodo?.createTime)}
						</Col>
					</Row>
					<Row>
						<Col>
							Modify Time: {formatDate(curTodo?.modifyTime)}
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size='sm'
						variant='secondary'
						onClick={() => setIsShow(false)}
					>
						Cancel
					</Button>
					<Button
						size='sm'
						variant='danger'
						onClick={() => {
							todoStore.removeTodo(curTodo?.id);
							setIsShow(false);
						}}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
});

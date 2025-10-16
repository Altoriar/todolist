import { useState, type FC } from 'react';
import {
	Button,
	Col,
	Container,
	ListGroup,
	Modal,
	OverlayTrigger,
	Row,
	Tooltip,
} from 'react-bootstrap';
import { CiSquareCheck, CiSquareRemove, CiStop1 } from 'react-icons/ci';
import { cloneDeep, isEmpty } from 'lodash';

import { formatDate } from '@/utils';
import { todoStore, type Todo } from '@/store/TodoStore';

import './index.less';
import { observer } from 'mobx-react-lite';

interface Props {
	todos: Todo[];
}

export const TodoList: FC<Props> = observer(({ todos }) => {
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [isShow, setIsShow] = useState(false);
	const [curTodo, setCurTodo] = useState<Todo>();

	const onDrag = (index: number) => {
		if (dragIndex === null || dragIndex === index) return;
		const newTodos = cloneDeep(todos);
		const [moved] = newTodos.splice(dragIndex, 1);
		newTodos.splice(index, 0, moved);
		todoStore.updateTodos(newTodos);
		setDragIndex(null);
	};

	const onComplete = (id: string) => {
		todoStore.completeTodo(id);
	};

	return (
		<ListGroup className='todo-list'>
			{todos.map((todo, index) => (
				<ListGroup.Item
					style={{
						cursor: 'grab',
						opacity: dragIndex === index ? 0.5 : 1,
						transition: 'all 0.2s ease',
					}}
					className='todo-item'
					key={todo.id}
					action
					draggable
					onDragStart={(e) => {
						e.dataTransfer.effectAllowed = 'move';
						setDragIndex(index);
					}}
					onDragOver={(e) => e.preventDefault()}
					onDrop={() => onDrag(index)}
				>
					<Container className='todo-icon'>
						<OverlayTrigger
							placement='top'
							delay={{ show: 250, hide: 400 }}
							overlay={<Tooltip>Is it completed？</Tooltip>}
						>
							{todo.completed ? (
								<CiSquareCheck
									onClick={() => onComplete(todo.id)}
								/>
							) : (
								<CiStop1 onClick={() => onComplete(todo.id)} />
							)}
						</OverlayTrigger>
					</Container>
					<Container>
						<Row className='todo-title'>
							<Col
								style={{
									textDecoration: todo.completed
										? 'line-through'
										: 'none',
								}}
							>
								{todo.title}
							</Col>
						</Row>
						<Row>
							<Col>{todo?.description}</Col>
						</Row>
						<Row className='todo-time'>
							{todo?.deadline ? (
								<Col>
									Deadline: {formatDate(todo?.deadline)}
								</Col>
							) : null}

							<Col>
								Create Time: {formatDate(todo.createTime)}
							</Col>
							<Col>
								Modify Time: {formatDate(todo.modifyTime)}
							</Col>
						</Row>
					</Container>
					<Container className='todo-remove'>
						<OverlayTrigger
							placement='top'
							delay={{ show: 250, hide: 400 }}
							overlay={<Tooltip>Should it be deleted？</Tooltip>}
						>
							<CiSquareRemove
								className='todo-remove-icon'
								onClick={() => {
									setIsShow(true);
									setCurTodo?.(todo);
								}}
							/>
						</OverlayTrigger>
					</Container>
				</ListGroup.Item>
			))}

			{isEmpty(todos) && (
				<Container className='no-todo'>
					<CiSquareCheck className='not-found-icon' />
					There is no todo for now.
				</Container>
			)}

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
		</ListGroup>
	);
});

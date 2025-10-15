import { useState, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Col,
	Container,
	ListGroup,
	OverlayTrigger,
	Row,
	Tooltip,
} from 'react-bootstrap';
import { CiSquareCheck, CiSquareRemove, CiStop1 } from 'react-icons/ci';
import { cloneDeep, isEmpty } from 'lodash';

import { formatDate } from '@/utils';
import type { Todo } from '@/store/TodoStore';

import './index.less';

interface Props {
	todos: Todo[];
	setIsShow: (isShow: boolean) => void;
	setCurTodo: (todo: Todo) => void;
	onComplete: (id: string) => void;
	onDrapUpdate?: (newTodos: Todo[]) => void;
}

export const TodoList: FC<Props> = observer(
	({ todos, setIsShow, setCurTodo, onComplete, onDrapUpdate }) => {
		const [dragIndex, setDragIndex] = useState<number | null>(null);

		const onDrag = (index: number) => {
			if (dragIndex === null || dragIndex === index) return;
			const newTodos = cloneDeep(todos);
			const [moved] = newTodos.splice(dragIndex, 1);
			newTodos.splice(index, 0, moved);
			onDrapUpdate?.(newTodos);
			setDragIndex(null);
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
									<CiStop1
										onClick={() => onComplete(todo.id)}
									/>
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
								overlay={
									<Tooltip>Should it be deleted？</Tooltip>
								}
							>
								<CiSquareRemove
									className='todo-remove-icon'
									onClick={() => {
										setIsShow(true);
										setCurTodo(todo);
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
			</ListGroup>
		);
	}
);

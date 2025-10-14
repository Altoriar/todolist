import type { FC } from 'react';
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

import type { Todo } from '@/store/TodoStore';
import { formatDate } from '@/utils';

import './index.less';

interface Props {
	todo: Todo;
	setIsShow: (isShow: boolean) => void;
	setCurTodo: (todo: Todo) => void;
	onComplete: (id: string) => void;
}

export const TodoItem: FC<Props> = observer(
	({ todo, setIsShow, setCurTodo, onComplete }) => {
		return (
			<ListGroup.Item className='todo-item' key={todo.id} action>
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
						<Col>{todo.title}</Col>
					</Row>
					<Row>
						<Col>{todo?.description}</Col>
					</Row>
					<Row className='todo-time'>
						{todo?.deadline ? (
							<Col>Deadline: {formatDate(todo?.deadline)}</Col>
						) : null}

						<Col>Create Time: {formatDate(todo.createTime)}</Col>
						<Col>Modify Time: {formatDate(todo.modifyTime)}</Col>
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
								setCurTodo(todo);
							}}
						/>
					</OverlayTrigger>
				</Container>
			</ListGroup.Item>
		);
	}
);

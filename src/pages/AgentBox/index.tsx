import { TodoList } from '@/compnents/TodoList';
import { todoStore } from '@/store/TodoStore';
import type { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const AgentBox: FC = () => {
	const { noDateTodos } = todoStore;
	return (
		<Container className='w-100 p-2'>
			<Row className='mb-2'>
				<Col>
					<h3>Agent Box</h3>
				</Col>
			</Row>

			<TodoList todos={noDateTodos} />
		</Container>
	);
};

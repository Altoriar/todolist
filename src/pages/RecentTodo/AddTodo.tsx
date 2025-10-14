import { todoStore, type Todo } from '@/store/TodoStore';
import moment from 'moment';
import { useState, type FC, type FormEvent } from 'react';
import {
	Button,
	Col,
	Container,
	Form,
	InputGroup,
	Offcanvas,
	Row,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

import './AddTodo.less';
import { isEmpty } from 'lodash';

export const AddTodo: FC = () => {
	const [isShow, setIsShow] = useState(false);
	const [todoName, setTodoName] = useState('');
	const [validated, setValidated] = useState(false);
	const [formData, setFormData] = useState<Todo>();

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

	const onChange = (key: keyof Todo, value: Todo[keyof Todo]) => {
		if (!isEmpty(formData)) {
			setFormData((prev) => ({
				...prev!,
				[key]: value,
			}));
		} else {
			const newTodo: Todo = {
				id: uuidv4(),
				title: '',
				completed: false,
				createTime: moment().unix(),
				modifyTime: moment().unix(),
				[key]: value,
			};
			setFormData(newTodo);
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		todoStore.addTodo(formData!);
		setIsShow(false);
		setValidated(false);
		setFormData(undefined);
	};

	return (
		<Container className='add-todo'>
			<Row>
				<Col>
					<InputGroup className='mb-3'>
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
					<Button variant='success' onClick={() => setIsShow(true)}>
						Add Todo
					</Button>
				</Col>
			</Row>

			<Offcanvas
				style={{ width: 600 }}
				className='add-todo-offcanvas'
				placement='end'
				show={isShow}
				onHide={() => {
					setValidated(false);
					setFormData(undefined);
					setIsShow(false);
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Add Todo</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Form noValidate validated={validated} onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								name='title'
								type='text'
								required
								placeholder='please enter the title'
								onChange={(e) =>
									onChange('title', e.target.value)
								}
							/>
							<Form.Control.Feedback type='invalid'>
								please enter the title!
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								name='description'
								as='textarea'
								rows={3}
								placeholder='please enter the description'
								onChange={(e) =>
									onChange('description', e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Deadline</Form.Label>
							<DatePicker
								name='deadline'
								selected={
									formData?.deadline
										? moment
												.unix(formData?.deadline)
												.toDate()
										: undefined
								}
								onChange={(date) =>
									onChange('deadline', moment(date).unix())
								}
								className='form-control' // 使用Bootstrap的form-control样式
								dateFormat='yyyy/MM/dd'
								placeholderText='Please select a date'
								showMonthDropdown
								showYearDropdown
								dropdownMode='select'
							/>
						</Form.Group>
						<Row className='add-todo-form-btns'>
							<Col>
								<Button
									variant='outline-dark'
									onClick={() => {
										setValidated(false);
										setFormData(undefined);
										setIsShow(false);
									}}
								>
									Cancel
								</Button>
							</Col>
							<Col>
								<Button variant='success' type='submit'>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				</Offcanvas.Body>
			</Offcanvas>
		</Container>
	);
};

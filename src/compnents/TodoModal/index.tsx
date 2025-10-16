import { todoStore, type Todo } from '@/store/TodoStore';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import {
	forwardRef,
	useImperativeHandle,
	useState,
	type FormEvent,
} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

export interface ModalOptions {
	data?: unknown;
}

export interface TodoModalRef {
	show: (modalOptions?: ModalOptions) => void;
	hide: () => void;
}

interface TodoModalProps {
	selectDate?: string;
}

export const TodoModal = observer(
	forwardRef<TodoModalRef, TodoModalProps>(({ selectDate }, ref) => {
		const [isShow, setIsShow] = useState(false);
		const [optons, setOptions] = useState<ModalOptions>();
		const [validated, setValidated] = useState(false);
		const [formData, setFormData] = useState<Todo>();

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
					createTime: selectDate
						? moment(selectDate).unix()
						: moment().unix(),
					modifyTime: selectDate
						? moment(selectDate).unix()
						: moment().unix(),
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

		useImperativeHandle(ref, () => ({
			show(opts) {
				setOptions(opts || {});
				setIsShow(true);
			},
			hide() {
				setIsShow(false);
			},
		}));

		return (
			<Modal centered show={isShow} onHide={() => setIsShow(false)}>
				<Modal.Header>
					<Row className='w-100 justify-content-between'>
						<Col className='d-flex'>Add Todo</Col>
						<Col className='d-flex justify-content-end'>
							{selectDate}
						</Col>
					</Row>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={onSubmit}>
						<Form.Group className='mb-4'>
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
						<Form.Group className='mb-4'>
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
						<Row className='mt-4 justify-content-end'>
							<Col className='flex-grow-0'>
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
							<Col className='flex-grow-0'>
								<Button variant='success' type='submit'>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		);
	})
);

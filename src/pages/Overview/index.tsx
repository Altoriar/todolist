import { useRef, useState, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Card, Col, Container, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import { todoStore } from '@/store/TodoStore';
import { TodoModal, type TodoModalRef } from '@/compnents/TodoModal';

export interface CalendarEvent {
	date: string;
	title: string;
}

interface Props {
	year?: number;
	month?: number; // 1-12
	date?: number; // 1-31
}

export const Overview: FC<Props> = observer(({ year, month, date }) => {
	const { todos } = todoStore;
	const today = moment();
	const [displayDate, setDisplayDate] = useState(
		moment({
			year: year ? year : today.year(),
			month: month ? month - 1 : today.month(),
			date: date ? date : today.date(),
		})
	);

	// 获取当月第一天和天数
	const firstDayOfMonth = displayDate.clone().startOf('month').day();
	const dayInMonth = displayDate.daysInMonth();

	// 生成格子
	const calendarDays: (number | null)[] = [];
	for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
	for (let d = 1; d <= dayInMonth; d++) calendarDays.push(d);
	for (let j = calendarDays.length; j < 42; j++) calendarDays.push(null);

	// 按周分组
	const weeks: (number | null)[][] = [];
	for (let i = 0; i < calendarDays.length; i += 7) {
		weeks.push(calendarDays.slice(i, i + 7));
	}

	const [selectDate, setSelectDate] = useState('');
	const todoModalRef = useRef<TodoModalRef>(null);

	const onDateClick = (dateStr: string) => {
		setSelectDate(dateStr);
		todoModalRef.current?.show();
	};

	const getTodos = (dateStr: string) =>
		todos.filter(
			(todo) =>
				moment.unix(todo.createTime).format('YYYY-MM-DD') === dateStr
		);

	const isSameDay = (day: number) =>
		moment(today).isSame(displayDate.clone().date(day), 'day');

	return (
		<Container className='w-100 p-2'>
			<Row className='g-3 mb-3'>
				<Col>
					<h3>Overview</h3>
				</Col>
				<Col className='d-flex justify-content-end'>
					<DatePicker
						className='form-control'
						name='deadline'
						selected={moment(displayDate).toDate()}
						onChange={(date) => setDisplayDate(moment(date))}
						dateFormat='yyyy/MM/dd'
						placeholderText='Please select a date'
						showMonthDropdown
						showYearDropdown
						dropdownMode='select'
					/>
				</Col>
			</Row>
			<Row className='fw-bold text-center mb-4'>
				{['日', '一', '二', '三', '四', '五', '六'].map((d) => (
					<Col key={d} className='p-2'>
						{d}
					</Col>
				))}
			</Row>

			{weeks.map((week, i) => (
				<Row key={i} className='mb-4'>
					{week.map((day, j) => {
						if (!day) return <Col key={j}></Col>;
						const dateStr = displayDate
							.clone()
							.date(day)
							.format('YYYY-MM-DD');

						return (
							<Col key={j}>
								<Card
									style={{ cursor: 'pointer' }}
									className='p-2'
									onClick={() => onDateClick(dateStr)}
								>
									<div
										className={`${
											isSameDay(day)
												? 'bg-success text-white'
												: ''
										} rounded text-center`}
									>
										{day}
									</div>
									{getTodos(dateStr).map((todo, idx) => (
										<div key={idx}>{todo.title}</div>
									))}
								</Card>
							</Col>
						);
					})}
				</Row>
			))}

			<TodoModal ref={todoModalRef} selectDate={selectDate} />
		</Container>
	);
});

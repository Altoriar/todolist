import moment from 'moment';
import { useState, type FC, type FormEvent } from 'react';
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Modal,
	Row,
} from 'react-bootstrap';

interface CalendarEvent {
	date: string;
	title: string;
}

interface CalendarProps {
	year?: number;
	month?: number; // 1-12
}

export const Calendar: FC<CalendarProps> = ({ year, month }) => {
	const today = moment();
	const displayDate = moment({
		year: year ? year : today.year(),
		month: month ? month - 1 : today.month(),
	});

	// 获取当月第一天和天数
	const firstDayOfMonth = displayDate.clone().startOf('month').day();
	const dayInMonth = displayDate.daysInMonth();

	// 生成格子
	const calendarDays: (number | null)[] = [];
	for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
	for (let d = 1; d <= dayInMonth; d++) calendarDays.push(d);

	// 按周分组
	const weeks: (number | null)[][] = [];
	for (let i = 0; i < calendarDays.length; i += 7) {
		weeks.push(calendarDays.slice(i, i + 7));
	}

	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectDate, setSelectDate] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [eventTitle, setEventTitle] = useState('');

	const onDayClick = (dateStr: string) => {
		setSelectDate(dateStr);
		setEventTitle('');
		setShowModal(true);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (eventTitle.trim()) {
			setEvents([...events, { date: selectDate, title: eventTitle }]);
		}
		setShowModal(false);
	};

	const getEvents = (dateStr: string) =>
		events.filter((event) => event.date === dateStr);

	return (
		<Container>
			<h3 className='mb-3'>{displayDate.format('YYYY年 MM月')}</h3>
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

						const isSameDay = moment(today).isSame(
							displayDate.clone().add(day - 1, 'day'),
							'day'
						);
						return (
							<Col key={j}>
								<Card
									style={{ cursor: 'pointer' }}
									className='p-2'
									onClick={() => onDayClick(dateStr)}
								>
									<div
										className={`${
											isSameDay
												? 'bg-success text-white'
												: ''
										} rounded text-center`}
									>
										{day}
									</div>
									{getEvents(dateStr).map((event, idx) => (
										<div key={idx}>{event.title}</div>
									))}
								</Card>
							</Col>
						);
					})}
				</Row>
			))}

			<Modal show={showModal} centered onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					Create Event {selectDate}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Event Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='please enter the event title'
								value={eventTitle}
								onKeyUp={(e) => {
									console.log(e.key);
								}}
								onChange={(e) => setEventTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='d-flex mt-4 gap-4 justify-content-end'>
							<Button
								variant='outline-dark'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>
							<Button variant='success' type='submit'>
								Confirm
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</Container>
	);
};

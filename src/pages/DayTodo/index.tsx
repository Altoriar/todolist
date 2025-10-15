import type { FC } from 'react';

import { Calendar } from '@/compnents/Calendar';

export const DayTodo: FC = () => {
	return (
		<div className='day-todo'>
			<Calendar />
		</div>
	);
};

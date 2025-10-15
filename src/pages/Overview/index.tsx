import { Calendar } from '@/compnents/Calendar';
import type { FC } from 'react';

export const Overview: FC = () => {
	return (
		<div className='day-todo'>
			<Calendar />
		</div>
	);
};

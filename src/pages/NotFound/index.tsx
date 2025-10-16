import type { FC } from 'react';

import { CiFileOff } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	const onJump = () => {
		navigate('/recent_todo');
	};

	return (
		<div
			style={{ color: '#ccc', cursor: 'pointer' }}
			className='d-flex align-items-center justify-content-center h-100 w-100 fs-4'
			onClick={onJump}
		>
			<CiFileOff className='fs-1' /> The page is not found. Click to jump
			to the homepage.
		</div>
	);
};

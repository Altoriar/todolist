import type { FC } from 'react';

import './index.less';
import { CiFileOff } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	const onJump = () => {
		navigate('/recent_todo');
	};

	return (
		<div className='not-found' onClick={onJump}>
			<CiFileOff className='not-found-icon' /> The page is not found.
			Click to jump to the homepage.
		</div>
	);
};

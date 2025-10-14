import { useState, type ElementType, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import * as CiIcon from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';

import { menuStore } from '@/store/MenuStore';

import './index.less';
import type { Menu } from '@/types';
import { isEmpty } from 'lodash';

export const CategoryMenu: FC = observer(() => {
	const { categoryMenus: menus } = menuStore;

	const [isShow, setIsShow] = useState(false);
	const [formData, setFormData] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	const getTheme = (path: string) => {
		return location.pathname === path ? 'success' : 'light';
	};

	const onChange = (key: keyof Menu, value: Menu[keyof Menu]) => {
		console.log(key, '--->', value);
		if (isEmpty(formData)) {
			const newMenu: Menu = {
				id: uuidv4(),
				title: '',
				path: '',
				icon: '',
				[key]: value,
			};
			setFormData(newMenu);
		} else {
			setFormData();
		}
	};

	const addMenu = () => {};

	return (
		<div className='catetory-menu'>
			<Stack gap={4} className='menu-buttons'>
				{menus.map((menu) => {
					const IconCompnent = (
						CiIcon as Record<string, ElementType>
					)[menu.icon];

					return (
						<Button
							className='menu-button'
							key={menu.id}
							variant={getTheme(menu.path)}
							onClick={() => navigate(menu.path)}
						>
							<span className='menu-icon'>
								{IconCompnent ? <IconCompnent /> : null}
							</span>
							{menu.title}
						</Button>
					);
				})}
				<Button
					className='create-menu'
					variant='light'
					onClick={() => setIsShow(true)}
				>
					<span className='menu-icon'>
						<CiIcon.CiSquarePlus />
					</span>
					Create Menu
				</Button>
			</Stack>

			<Modal
				size='lg'
				centered
				show={isShow}
				onHide={() => setIsShow(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Create Menu Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Menu Title</Form.Label>
							<Form.Control
								name='title'
								type='text'
								placeholder='please enter the menu title'
								onChange={(e) =>
									onChange('title', e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Menu Path</Form.Label>
							<Form.Control
								name='path'
								type='text'
								placeholder='please enter the menu path'
								onChange={(e) =>
									onChange('path', e.target.value)
								}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Menu Icon Color</Form.Label>
							<Form.Control
								name='color'
								type='color'
								defaultValue='#563dc'
								title='Choose your color'
								onChange={(e) =>
									onChange('icon', e.target.value)
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='outline-light'
						onClick={() => setIsShow(false)}
					>
						Close
					</Button>
					<Button variant='success' onClick={addMenu}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
});

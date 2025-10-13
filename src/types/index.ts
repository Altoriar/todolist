import type { ReactNode } from 'react';
import type { ButtonVariant } from 'react-bootstrap/esm/types';

export interface Menu {
	id: string;
	path: string;
	theme?: ButtonVariant;
	icon?: ReactNode;
	title: string;
}

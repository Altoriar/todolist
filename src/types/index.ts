import type { ButtonVariant } from 'react-bootstrap/esm/types';

export type ThemeName =
	| 'blue'
	| 'green'
	| 'yellow'
	| 'red'
	| 'skyblue'
	| 'dark'
	| 'light';

export interface Menu {
	id: string;
	path: string;
	theme?: ButtonVariant;
	icon: string;
	title: string;
}

export interface Theme {
	name: ThemeName;
	title: string;
}

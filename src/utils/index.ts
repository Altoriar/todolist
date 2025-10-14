import moment from 'moment';

export const storage = {
	set<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	get<T>(key: string, defaultValue: T) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
	},
	remove(key: string) {
		localStorage.removeItem(key);
	},
	clear() {
		localStorage.clear();
	},
};

export const formatDate = (timeStamp?: number) => {
	if (!timeStamp || timeStamp <= 0) return timeStamp;
	let time = '';

	const now = moment();
	const target = moment.unix(timeStamp);
	const diffInHour = now.diff(target, 'hour');

	if (diffInHour < 24) {
		time = `today ${target.format('HH:mm')}`;
	} else if (diffInHour < 48) {
		time = `yesterday ${target.format('HH:mm')}`;
	} else {
		time = target.format('YYYY-MM-DD');
	}

	return time;
};

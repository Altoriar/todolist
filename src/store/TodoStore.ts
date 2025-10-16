import { makeAutoObservable, reaction, toJS } from 'mobx';
import { isEmpty } from 'lodash';
import { storage } from '@/utils';
import moment from 'moment';

export interface Todo {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	deadline?: number;
	createTime: number;
	modifyTime: number;
}

class TodoStore {
	keywords: string = '';
	todos: Todo[] = [];

	constructor() {
		makeAutoObservable(this);

		this.todos = storage.get('todos', []);

		reaction(
			() => toJS(this.todos),
			() => {
				storage.set('todos', this.todos);
			}
		);
	}

	get dayTodos() {
		return this.todos.filter(
			(todo) =>
				todo.createTime > moment().startOf('day').unix() &&
				todo.createTime < moment().endOf('day').unix()
		);
	}

	get noDateTodos() {
		return this.todos.filter((todo) => !todo?.deadline);
	}

	get filterTodos() {
		if (isEmpty(this.keywords)) return this.todos;
		return this.todos.filter(
			(todo) =>
				todo.title.includes(this.keywords) ||
				todo.description?.includes(this.keywords)
		);
	}

	updateTodos(todos: Todo[] = []) {
		this.todos = todos;
	}

	addTodo(todo: Todo) {
		this.todos.unshift(todo);
	}

	completeTodo(id: string) {
		const findIndex = this.todos.findIndex((todo) => todo.id === id);
		if (findIndex !== -1) {
			this.todos[findIndex].completed = !this.todos[findIndex].completed;
		}
	}

	removeTodo(id?: string) {
		const findIndex = this.todos.findIndex((todo) => todo.id === id);
		if (findIndex !== -1) {
			this.todos.splice(findIndex, 1);
		}
	}
}

export const todoStore = new TodoStore();

import { makeAutoObservable, reaction } from 'mobx';
import { isEmpty } from 'lodash';
import { storage } from '@/utils';

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
			() => this.todos,
			() => {
				storage.set('todos', this.todos);
			}
		);
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

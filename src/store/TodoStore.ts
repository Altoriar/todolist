import { storage } from '@/utils';
import { autorun, makeAutoObservable } from 'mobx';

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
	todos: Todo[] = [];

	constructor() {
		makeAutoObservable(this);
		this.todos = storage.get('todos', []);

		autorun(() => {
			storage.set('todos', this.todos);
		});
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

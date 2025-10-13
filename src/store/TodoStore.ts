import { makeAutoObservable } from 'mobx';

export interface Todo {
	id: string;
	title: string;
	content: string;
}

class TodoStore {
	todos: Todo[] = [{ id: 'xxxx', title: 'title 1', content: 'content 1' }];

	constructor() {
		makeAutoObservable(this);
	}

	addTodo(todo: Todo) {
		this.todos.unshift(todo);
	}

	removeTodo(id: string) {
		const findIndex = this.todos.findIndex((todo) => todo.id === id);
		this.todos.splice(findIndex, 1);
	}
}

export const todoStore = new TodoStore();

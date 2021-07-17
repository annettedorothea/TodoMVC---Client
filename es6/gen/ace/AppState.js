/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import * as AppUtils from "../../src/app/AppUtils";

let appState;

export function getAppState() {
	return AppUtils.deepCopy(appState);
}

export function setInitialAppState(initialAppState) {
	appState = AppUtils.deepCopy(initialAppState);
}

export function get_container_footer() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.footer) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.container.footer);
}

export function set_container_footer(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	appState.container.footer = eventData.footer;
}

export function merge_container_footer(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.footer) {
		appState.container.footer = {};
	}
	if (eventData.categoryId !== undefined) {
		appState.container.footer.categoryId = eventData.categoryId;
	}
	if (eventData.itemCount !== undefined) {
		appState.container.footer.itemCount = eventData.itemCount;
	}
}

export function get_container_footer_categoryId() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.footer) {
		return undefined;
	}
	return appState.container.footer.categoryId;
}

export function set_container_footer_categoryId(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.footer) {
		appState.container.footer = {};
	}
	appState.container.footer.categoryId = eventData.categoryId;
}

export function get_container_footer_itemCount() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.footer) {
		return undefined;
	}
	return appState.container.footer.itemCount;
}

export function set_container_footer_itemCount(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.footer) {
		appState.container.footer = {};
	}
	appState.container.footer.itemCount = eventData.itemCount;
}

export function get_container_filter() {
	if (!appState.container) {
		return undefined;
	}
	return appState.container.filter;
}

export function set_container_filter(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	appState.container.filter = eventData.filter;
}

export function get_container_newTodoInput() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.newTodoInput) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.container.newTodoInput);
}

export function set_container_newTodoInput(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	appState.container.newTodoInput = eventData.newTodoInput;
}

export function merge_container_newTodoInput(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.newTodoInput) {
		appState.container.newTodoInput = {};
	}
	if (eventData.newTodo !== undefined) {
		appState.container.newTodoInput.newTodo = eventData.newTodo;
	}
}

export function get_container_newTodoInput_newTodo() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.newTodoInput) {
		return undefined;
	}
	return appState.container.newTodoInput.newTodo;
}

export function set_container_newTodoInput_newTodo(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.newTodoInput) {
		appState.container.newTodoInput = {};
	}
	appState.container.newTodoInput.newTodo = eventData.newTodo;
}

export function get_container_spinner() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.spinner) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.container.spinner);
}

export function set_container_spinner(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	appState.container.spinner = eventData.spinner;
}

export function merge_container_spinner(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.spinner) {
		appState.container.spinner = {};
	}
	if (eventData.loading !== undefined) {
		appState.container.spinner.loading = eventData.loading;
	}
}

export function get_container_spinner_loading() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.spinner) {
		return undefined;
	}
	return appState.container.spinner.loading;
}

export function set_container_spinner_loading(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.spinner) {
		appState.container.spinner = {};
	}
	appState.container.spinner.loading = eventData.loading;
}

export function get_container_todos() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.todos) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.container.todos);
}

export function set_container_todos(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	appState.container.todos = eventData.todos;
}

export function merge_container_todos(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.todos) {
		appState.container.todos = {};
	}
	if (eventData.todoList !== undefined) {
		appState.container.todos.todoList = eventData.todoList;
	}
	if (eventData.editedDescription !== undefined) {
		appState.container.todos.editedDescription = eventData.editedDescription;
	}
	if (eventData.editedTodoId !== undefined) {
		appState.container.todos.editedTodoId = eventData.editedTodoId;
	}
}

export function get_container_todos_todoList() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.todos) {
		return undefined;
	}
	if (!appState.container.todos.todoList) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.container.todos.todoList);
}

export function set_container_todos_todoList(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.todos) {
		appState.container.todos = {};
	}
	appState.container.todos.todoList = eventData.todoList;
}

export function get_container_todos_editedDescription() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.todos) {
		return undefined;
	}
	return appState.container.todos.editedDescription;
}

export function set_container_todos_editedDescription(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.todos) {
		appState.container.todos = {};
	}
	appState.container.todos.editedDescription = eventData.editedDescription;
}

export function get_container_todos_editedTodoId() {
	if (!appState.container) {
		return undefined;
	}
	if (!appState.container.todos) {
		return undefined;
	}
	return appState.container.todos.editedTodoId;
}

export function set_container_todos_editedTodoId(eventData) {
	if (!appState.container) {
		appState.container = {};
	}
	if (!appState.container.todos) {
		appState.container.todos = {};
	}
	appState.container.todos.editedTodoId = eventData.editedTodoId;
}


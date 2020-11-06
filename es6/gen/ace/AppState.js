/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import AppUtils from "../../src/app/AppUtils";

export let appState;

export function getAppState() {
	return AppUtils.deepCopy(appState);
}

export function setInitialAppState(initialAppState) {
	appState = AppUtils.deepCopy(initialAppState);
}

export function get_filter() {
	return appState.filter;
}

export function set_filter(eventData) {
	appState.filter = eventData.filter;
}

export function get_newTodo() {
	return appState.newTodo;
}

export function set_newTodo(eventData) {
	appState.newTodo = eventData.newTodo;
}

export function get_loading() {
	return appState.loading;
}

export function set_loading(eventData) {
	appState.loading = eventData.loading;
}

export function get_todoList() {
	return appState.todoList;
}

export function set_todoList(eventData) {
	appState.todoList = eventData.todoList;
}

export function get_error() {
	return appState.error;
}

export function set_error(eventData) {
	appState.error = eventData.error;
}

export function get_editedTodo() {
	if (!appState.editedTodo) {
		return undefined;
	}
	return AppUtils.deepCopy(appState.editedTodo);
}

export function set_editedTodo(eventData) {
	appState.editedTodo = eventData.editedTodo;
}

export function merge_editedTodo(eventData) {
	if (!appState.editedTodo) {
		appState.editedTodo = {};
	}
	if (eventData.editedDescription !== undefined) {
		appState.editedTodo.editedDescription = eventData.editedDescription;
	}
	if (eventData.id !== undefined) {
		appState.editedTodo.id = eventData.id;
	}
	if (eventData.description !== undefined) {
		appState.editedTodo.description = eventData.description;
	}
}

export function get_editedTodo_editedDescription() {
	if (!appState.editedTodo) {
		return undefined;
	}
	return appState.editedTodo.editedDescription;
}

export function set_editedTodo_editedDescription(eventData) {
	if (!appState.editedTodo) {
		appState.editedTodo = {};
	}
	appState.editedTodo.editedDescription = eventData.editedDescription;
}

export function get_editedTodo_id() {
	if (!appState.editedTodo) {
		return undefined;
	}
	return appState.editedTodo.id;
}

export function set_editedTodo_id(eventData) {
	if (!appState.editedTodo) {
		appState.editedTodo = {};
	}
	appState.editedTodo.id = eventData.id;
}

export function get_editedTodo_description() {
	if (!appState.editedTodo) {
		return undefined;
	}
	return appState.editedTodo.description;
}

export function set_editedTodo_description(eventData) {
	if (!appState.editedTodo) {
		appState.editedTodo = {};
	}
	appState.editedTodo.description = eventData.description;
}


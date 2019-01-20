import AppUtils from "../../src/app/AppUtils";

let state;

export function getState() {
	return AppUtils.deepCopy(state);
}

export function setInitialState(initialState) {
	state = AppUtils.deepCopy(initialState);
}

export function set_state_State_filter(eventData) {
	state.filter = eventData.filter;
}

export function get_state_State_filter() {
	return state.filter;
}

export function reset_state_State_filter() {
	state.filter = null;
}
export function set_state_State_newTodo(eventData) {
	state.newTodo = eventData.newTodo;
}

export function get_state_State_newTodo() {
	return state.newTodo;
}

export function reset_state_State_newTodo() {
	state.newTodo = null;
}
export function set_state_State_loading(eventData) {
	state.loading = eventData.loading;
}

export function get_state_State_loading() {
	return state.loading;
}

export function reset_state_State_loading() {
	state.loading = null;
}
export function set_state_State_todoList(eventData) {
	state.todoList = eventData.todoList;
}

export function get_state_State_todoList() {
	return state.todoList;
}

export function reset_state_State_todoList() {
	state.todoList = null;
}
export function set_state_State_editedTodo(eventData) {
	state.editedTodo = eventData.editedTodo;
}

export function get_state_State_editedTodo() {
	return AppUtils.deepCopy(state.editedTodo);
}

export function merge_state_State_editedTodo(eventData) {
	if (eventData.editedDescription !== undefined) {
		state.editedTodo.editedDescription = eventData.editedDescription;
	}
	if (eventData.id !== undefined) {
		state.editedTodo.id = eventData.id;
	}
	if (eventData.description !== undefined) {
		state.editedTodo.description = eventData.description;
	}
}

export function reset_state_State_editedTodo() {
	state.editedTodo = null;
}

export function set_state_State_editedTodo_EditedTodo_editedDescription(eventData) {
	state.editedTodo.editedDescription = eventData.editedDescription;
}

export function get_state_State_editedTodo_EditedTodo_editedDescription() {
	return state.editedTodo.editedDescription;
}

export function reset_state_State_editedTodo_EditedTodo_editedDescription() {
	state.editedTodo.editedDescription = null;
}
export function set_state_State_editedTodo_EditedTodo_id(eventData) {
	state.editedTodo.id = eventData.id;
}

export function get_state_State_editedTodo_EditedTodo_id() {
	return state.editedTodo.id;
}

export function reset_state_State_editedTodo_EditedTodo_id() {
	state.editedTodo.id = null;
}
export function set_state_State_editedTodo_EditedTodo_description(eventData) {
	state.editedTodo.description = eventData.description;
}

export function get_state_State_editedTodo_EditedTodo_description() {
	return state.editedTodo.description;
}

export function reset_state_State_editedTodo_EditedTodo_description() {
	state.editedTodo.description = null;
}


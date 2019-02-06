import AppUtils from "../../src/app/AppUtils";
import { state } from "./WriteAppState";

export function getState() {
	return AppUtils.deepCopy(state);
}

export function get_state_State_filter() {
	return state.filter;
}

export function get_state_State_newTodo() {
	return state.newTodo;
}

export function get_state_State_loading() {
	return state.loading;
}

export function get_state_State_todoList() {
	return state.todoList;
}

export function get_state_State_editedTodo() {
	return AppUtils.deepCopy(state.editedTodo);
}

export function get_state_State_editedTodo_EditedTodo_editedDescription() {
	return state.editedTodo.editedDescription;
}

export function get_state_State_editedTodo_EditedTodo_id() {
	return state.editedTodo.id;
}

export function get_state_State_editedTodo_EditedTodo_description() {
	return state.editedTodo.description;
}



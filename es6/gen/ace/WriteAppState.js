/* 
 * Copyright (c) 2019, Annette Pohl, Koblenz, Germany
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */




import AppUtils from "../../src/app/AppUtils";

export let state;

export function setInitialState(initialState) {
	state = AppUtils.deepCopy(initialState);
}

export function set_state_State_filter(eventData) {
	state.filter = eventData.filter;
}

export function reset_state_State_filter() {
	state.filter = null;
}

export function init_state_State_filter() {
	state.filter = null;
}
export function set_state_State_newTodo(eventData) {
	state.newTodo = eventData.newTodo;
}

export function reset_state_State_newTodo() {
	state.newTodo = null;
}

export function init_state_State_newTodo() {
	state.newTodo = null;
}
export function set_state_State_loading(eventData) {
	state.loading = eventData.loading;
}

export function reset_state_State_loading() {
	state.loading = null;
}

export function init_state_State_loading() {
	state.loading = null;
}
export function set_state_State_todoList(eventData) {
	state.todoList = eventData.todoList;
}

export function reset_state_State_todoList() {
	state.todoList = null;
}

export function init_state_State_todoList() {
	state.todoList = null;
}
export function set_state_State_editedTodo(eventData) {
	state.editedTodo = eventData.editedTodo;
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

export function init_state_State_editedTodo() {
	state.editedTodo = {};
}

export function set_state_State_editedTodo_EditedTodo_editedDescription(eventData) {
	state.editedTodo.editedDescription = eventData.editedDescription;
}

export function reset_state_State_editedTodo_EditedTodo_editedDescription() {
	state.editedTodo.editedDescription = null;
}

export function init_state_State_editedTodo_EditedTodo_editedDescription() {
	state.editedTodo.editedDescription = null;
}
export function set_state_State_editedTodo_EditedTodo_id(eventData) {
	state.editedTodo.id = eventData.id;
}

export function reset_state_State_editedTodo_EditedTodo_id() {
	state.editedTodo.id = null;
}

export function init_state_State_editedTodo_EditedTodo_id() {
	state.editedTodo.id = null;
}
export function set_state_State_editedTodo_EditedTodo_description(eventData) {
	state.editedTodo.description = eventData.description;
}

export function reset_state_State_editedTodo_EditedTodo_description() {
	state.editedTodo.description = null;
}

export function init_state_State_editedTodo_EditedTodo_description() {
	state.editedTodo.description = null;
}


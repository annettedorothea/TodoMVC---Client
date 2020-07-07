/* 
 * Copyright (c) 2020, Annette Pohl, Koblenz, Germany
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
 *
 * generated with de.acegen 0.9.5
 *
 */




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

export function reset_filter() {
	appState.filter = null;
}

export function get_newTodo() {
	return appState.newTodo;
}

export function set_newTodo(eventData) {
	appState.newTodo = eventData.newTodo;
}

export function reset_newTodo() {
	appState.newTodo = null;
}

export function get_loading() {
	return appState.loading;
}

export function set_loading(eventData) {
	appState.loading = eventData.loading;
}

export function reset_loading() {
	appState.loading = null;
}

export function get_todoList() {
	return appState.todoList;
}

export function set_todoList(eventData) {
	appState.todoList = eventData.todoList;
}

export function reset_todoList() {
	appState.todoList = null;
}

export function get_list() {
	return appState.list;
}

export function set_list(eventData) {
	appState.list = eventData.list;
}

export function reset_list() {
	appState.list = null;
}

export function get_editedTodo() {
	return AppUtils.deepCopy(appState.editedTodo);
}

export function set_editedTodo(eventData) {
	appState.editedTodo = eventData.editedTodo;
}

export function reset_editedTodo() {
	appState.editedTodo = null;
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

export function reset_editedTodo_editedDescription() {
	if (!appState.editedTodo) {
		return;
	}
	appState.editedTodo.editedDescription = null;
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

export function reset_editedTodo_id() {
	if (!appState.editedTodo) {
		return;
	}
	appState.editedTodo.id = null;
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

export function reset_editedTodo_description() {
	if (!appState.editedTodo) {
		return;
	}
	appState.editedTodo.description = null;
}


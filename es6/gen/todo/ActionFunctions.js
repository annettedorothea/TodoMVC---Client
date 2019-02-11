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




import InitAction from "../../src/todo/actions/InitAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import NewTodoChangedAction from "../../src/todo/actions/NewTodoChangedAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import EditedTodoChangedAction from "../../src/todo/actions/EditedTodoChangedAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export function init(hash) {
    new InitAction(hash).apply();
}

export function getTodoList() {
    new GetTodoListAction().apply();
}

export function newTodoChanged(newTodo) {
    new NewTodoChangedAction(newTodo).apply();
}

export function createTodo(description) {
    new CreateTodoAction(description).apply();
}

export function editTodo(id) {
    new EditTodoAction(id).apply();
}

export function editedTodoChanged(editedDescription) {
    new EditedTodoChangedAction(editedDescription).apply();
}

export function updateTodo() {
    new UpdateTodoAction().apply();
}

export function toggleTodo(id) {
    new ToggleTodoAction(id).apply();
}

export function toggleAll() {
    new ToggleAllAction().apply();
}

export function deleteTodo(id) {
    new DeleteTodoAction(id).apply();
}

export function clearDone() {
    new ClearDoneAction().apply();
}





/******* S.D.G. *******/




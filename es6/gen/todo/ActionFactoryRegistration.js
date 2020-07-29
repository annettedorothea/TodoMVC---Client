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
 * generated with de.acegen 0.9.8
 *
 */




import ACEController from "../ace/ACEController";
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

export default class ActionFactoryRegistrationTodo {

	static init() {
		ACEController.registerFactory('todo.InitAction', 
			(actionData) => new InitAction(actionData.hash));
		ACEController.registerFactory('todo.GetTodoListAction', 
			(actionData) => new GetTodoListAction());
		ACEController.registerFactory('todo.NewTodoChangedAction', 
			(actionData) => new NewTodoChangedAction(actionData.newTodo));
		ACEController.registerFactory('todo.CreateTodoAction', 
			(actionData) => new CreateTodoAction(actionData.description));
		ACEController.registerFactory('todo.EditTodoAction', 
			(actionData) => new EditTodoAction(actionData.id));
		ACEController.registerFactory('todo.EditedTodoChangedAction', 
			(actionData) => new EditedTodoChangedAction(actionData.editedDescription));
		ACEController.registerFactory('todo.UpdateTodoAction', 
			(actionData) => new UpdateTodoAction());
		ACEController.registerFactory('todo.ToggleTodoAction', 
			(actionData) => new ToggleTodoAction(actionData.id));
		ACEController.registerFactory('todo.ToggleAllAction', 
			(actionData) => new ToggleAllAction());
		ACEController.registerFactory('todo.DeleteTodoAction', 
			(actionData) => new DeleteTodoAction(actionData.id));
		ACEController.registerFactory('todo.ClearDoneAction', 
			(actionData) => new ClearDoneAction());
	}

}




/******* S.D.G. *******/




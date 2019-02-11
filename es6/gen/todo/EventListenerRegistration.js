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




import ACEController from "../ace/ACEController";
import * as AppState from "../ace/WriteAppState";

export default class EventListenerRegistrationTodo {

	static init() {
		ACEController.registerListener('todo.InitOkEvent', AppState.set_state_State_filter);
		ACEController.registerListener('todo.GetTodoListOkEvent', AppState.set_state_State_todoList);
		ACEController.registerListener('todo.NewTodoChangedOkEvent', AppState.set_state_State_newTodo);
		ACEController.registerListener('todo.CreateTodoOkEvent', AppState.set_state_State_newTodo);
		ACEController.registerListener('todo.EditTodoOkEvent', AppState.set_state_State_editedTodo);
		ACEController.registerListener('todo.EditedTodoChangedOkEvent', AppState.set_state_State_editedTodo_EditedTodo_editedDescription);
		ACEController.registerListener('todo.UpdateTodoOkEvent', AppState.reset_state_State_editedTodo);
		ACEController.registerListener('todo.UpdateTodoEmptyEvent', AppState.reset_state_State_editedTodo);
	}

}




/******* S.D.G. *******/




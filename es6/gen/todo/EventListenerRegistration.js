import ACEController from "../ace/ACEController";
import * as AppState from "../ace/AppState";

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

/*       S.D.G.       */

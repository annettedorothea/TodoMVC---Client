/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import ACEController from "../ace/ACEController";
import * as AppState from "../ace/AppState";

export default class EventListenerRegistrationTodo {

	static init() {
		ACEController.registerListener('todo.InitOkEvent', AppState.set_container_filter);
		ACEController.registerListener('todo.InitOkEvent', AppState.set_container_footer_categoryId);
		ACEController.registerListener('todo.GetTodoListOkEvent', AppState.set_container_todos_todoList);
		ACEController.registerListener('todo.GetTodoListOkEvent', AppState.set_container_footer_itemCount);
		ACEController.registerListener('todo.GetTodoListWithoutCategoryCheckOkEvent', AppState.set_container_todos_todoList);
		ACEController.registerListener('todo.NewTodoChangedOkEvent', AppState.set_container_newTodoInput_newTodo);
		ACEController.registerListener('todo.CreateTodoOkEvent', AppState.set_container_newTodoInput_newTodo);
		ACEController.registerListener('todo.EditTodoOkEvent', AppState.set_container_todos_editedDescription);
		ACEController.registerListener('todo.EditTodoOkEvent', AppState.set_container_todos_editedTodoId);
		ACEController.registerListener('todo.EditedTodoChangedOkEvent', AppState.set_container_todos_editedDescription);
		ACEController.registerListener('todo.UpdateTodoOkEvent', AppState.set_container_todos_editedDescription);
		ACEController.registerListener('todo.UpdateTodoOkEvent', AppState.set_container_todos_editedTodoId);
		ACEController.registerListener('todo.UpdateTodoEmptyEvent', AppState.set_container_todos_editedDescription);
		ACEController.registerListener('todo.UpdateTodoEmptyEvent', AppState.set_container_todos_editedTodoId);
		ACEController.registerListener('todo.DisplayErrorOkEvent', AppState.set_container_error_errorMessage);
	}

}




/******* S.D.G. *******/




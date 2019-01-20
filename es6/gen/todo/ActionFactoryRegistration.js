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

/*       S.D.G.       */

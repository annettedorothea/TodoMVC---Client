import ACEController from "../ace/ACEController";
import InitAction from "../../src/todo/actions/InitAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export default class ActionFactoryRegistrationTodo {

	static init() {
		ACEController.registerFactory('todo.InitAction', (actionData) => new InitAction(actionData));
		ACEController.registerFactory('todo.GetTodoListAction', (actionData) => new GetTodoListAction(actionData));
		ACEController.registerFactory('todo.CreateTodoAction', (actionData) => new CreateTodoAction(actionData));
		ACEController.registerFactory('todo.EditTodoAction', (actionData) => new EditTodoAction(actionData));
		ACEController.registerFactory('todo.UpdateTodoAction', (actionData) => new UpdateTodoAction(actionData));
		ACEController.registerFactory('todo.ToggleTodoAction', (actionData) => new ToggleTodoAction(actionData));
		ACEController.registerFactory('todo.ToggleAllAction', (actionData) => new ToggleAllAction(actionData));
		ACEController.registerFactory('todo.DeleteTodoAction', (actionData) => new DeleteTodoAction(actionData));
		ACEController.registerFactory('todo.ClearDoneAction', (actionData) => new ClearDoneAction(actionData));
	}

}

/*       S.D.G.       */

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
import BugAction from "../../src/todo/actions/BugAction";

export default class ActionFactoryRegistrationTodo {

	static init() {
		ACEController.registerFactory('todo.InitAction', (actionParam) => new InitAction(actionParam));
		ACEController.registerFactory('todo.GetTodoListAction', (actionParam) => new GetTodoListAction(actionParam));
		ACEController.registerFactory('todo.CreateTodoAction', (actionParam) => new CreateTodoAction(actionParam));
		ACEController.registerFactory('todo.EditTodoAction', (actionParam) => new EditTodoAction(actionParam));
		ACEController.registerFactory('todo.UpdateTodoAction', (actionParam) => new UpdateTodoAction(actionParam));
		ACEController.registerFactory('todo.ToggleTodoAction', (actionParam) => new ToggleTodoAction(actionParam));
		ACEController.registerFactory('todo.ToggleAllAction', (actionParam) => new ToggleAllAction(actionParam));
		ACEController.registerFactory('todo.DeleteTodoAction', (actionParam) => new DeleteTodoAction(actionParam));
		ACEController.registerFactory('todo.ClearDoneAction', (actionParam) => new ClearDoneAction(actionParam));
		ACEController.registerFactory('todo.BugAction', (actionParam) => new BugAction(actionParam));
	}

}

/*       S.D.G.       */

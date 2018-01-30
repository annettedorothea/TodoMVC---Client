import ACEController from "../ace/ACEController";
import TodoView from "../../src/todo/views/TodoView";
import FooterView from "../../src/todo/views/FooterView";

export default class EventListenerRegistrationTodo {

	static init() {
		ACEController.registerListener('todo.RenderListEvent', TodoView.list);
		ACEController.registerListener('todo.EditTodoEvent', TodoView.edit);
		ACEController.registerListener('todo.InitFilterEvent', FooterView.initFilter);
	}

}

/*       S.D.G.       */

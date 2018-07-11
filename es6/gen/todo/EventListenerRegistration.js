import ACEController from "../ace/ACEController";
import FooterView from "../../src/todo/views/FooterView";
import TodoView from "../../src/todo/views/TodoView";

export default class EventListenerRegistrationTodo {

	static init() {
		ACEController.registerListener('todo.InitAllEvent', FooterView.initFilter);
		ACEController.registerListener('todo.InitDoneEvent', FooterView.initFilter);
		ACEController.registerListener('todo.InitOpenEvent', FooterView.initFilter);
		ACEController.registerListener('todo.GetTodoListOkEvent', TodoView.setTodoList);
		ACEController.registerListener('todo.NewTodoChangedOkEvent', TodoView.newTodoChanged);
		ACEController.registerListener('todo.EditTodoOkEvent', TodoView.setTodoList);
		ACEController.registerListener('todo.EditedTodoChangedOkEvent', TodoView.setTodoList);
	}

}

/*       S.D.G.       */

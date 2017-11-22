import ACEController from "../ace/ACEController";
import TodoView from "../../src/todo/views/TodoView";
import FooterView from "../../src/todo/views/FooterView";
import BugView from "../../src/todo/views/BugView";

export default class EventListenerRegistrationTodo {

	static init() {
	    	ACEController.registerListener('todo.RenderListEvent', TodoView.list);
	    	ACEController.registerListener('todo.EditTodoEvent', TodoView.edit);
	    	ACEController.registerListener('todo.InitFilterEvent', FooterView.initFilter);
	    	ACEController.registerListener('todo.BugEvent', BugView.start);
	}

}

/*       S.D.G.       */

import ACEController from "../../ace/ACEController";
import TodoView from "../../../src/todo/TodoView";
import FooterView from "../../../src/todo/FooterView";

export default class EventListenerRegistrationTodo {

	static init() {
    	ACEController.registerListener('RenderListEvent', TodoView.list);
    	ACEController.registerListener('EditTodoEvent', TodoView.edit);
    	ACEController.registerListener('InitFilterEvent', FooterView.initFilter);
	}

}

/*       S.D.G.       */

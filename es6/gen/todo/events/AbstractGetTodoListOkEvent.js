import Event from "../../../gen/ace/AsynchronousEvent";

export default class AbstractGetTodoListOkEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.GetTodoListOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.setTodoList" ];
	}
}


/*       S.D.G.       */

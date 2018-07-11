import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractEditTodoOkEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.EditTodoOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.setTodoList" ];
	}
}


/*       S.D.G.       */

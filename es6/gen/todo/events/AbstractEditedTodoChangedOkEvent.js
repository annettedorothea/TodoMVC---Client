import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractEditedTodoChangedOkEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.EditedTodoChangedOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.setTodoList" ];
	}
}


/*       S.D.G.       */

import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractNewTodoChangedOkEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.NewTodoChangedOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.newTodoChanged" ];
	}
}


/*       S.D.G.       */

import Event from "../../../gen/ace/Event";

export default class AbstractGetTodoListOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.GetTodoListOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.list" ];
	}
}


/*       S.D.G.       */

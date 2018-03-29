import Event from "../../../gen/ace/Event";

export default class AbstractEditTodoOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.EditTodoOkEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.TodoView.edit" ];
	}
}


/*       S.D.G.       */

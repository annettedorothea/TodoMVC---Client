import Event from "../../../gen/ace/Event";

export default class AbstractEditTodoEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.EditTodoEvent');
    }
}

/*       S.D.G.       */

import Event from "../../../gen/ace/Event";

export default class AbstractEditTodoOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.EditTodoOkEvent');
    }
}

/*       S.D.G.       */

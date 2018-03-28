import Event from "../../../gen/ace/Event";

export default class AbstractDeleteTodoOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.DeleteTodoOkEvent');
    }
}

/*       S.D.G.       */

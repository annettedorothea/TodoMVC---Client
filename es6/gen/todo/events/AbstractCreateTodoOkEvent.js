import Event from "../../../gen/ace/Event";

export default class AbstractCreateTodoOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.CreateTodoOkEvent');
    }
}

/*       S.D.G.       */

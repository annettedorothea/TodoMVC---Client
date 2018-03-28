import Event from "../../../gen/ace/Event";

export default class AbstractUpdateTodoOkEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.UpdateTodoOkEvent');
    }
}

/*       S.D.G.       */

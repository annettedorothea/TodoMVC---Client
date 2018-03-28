import Event from "../../../gen/ace/Event";

export default class AbstractUpdateTodoEmptyEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.UpdateTodoEmptyEvent');
    }
}

/*       S.D.G.       */

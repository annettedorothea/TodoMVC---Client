import Event from "../../../gen/ace/Event";

export default class AbstractCreateTodoEmptyEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.CreateTodoEmptyEvent');
    }
}

/*       S.D.G.       */

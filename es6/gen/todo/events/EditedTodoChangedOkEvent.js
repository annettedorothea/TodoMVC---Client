import Event from "../../../gen/ace/Event";

export default class EditedTodoChangedOkEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.EditedTodoChangedOkEvent');
    }
}


/*       S.D.G.       */

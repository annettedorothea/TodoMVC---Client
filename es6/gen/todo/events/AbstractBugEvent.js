import Event from "../../../gen/ace/Event";

export default class AbstractBugEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.BugEvent');
    }
}

/*       S.D.G.       */

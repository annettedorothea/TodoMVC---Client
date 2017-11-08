import Event from "../../../gen/ace/Event";

export default class AbstractInitFilterEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.InitFilterEvent');
    }
}

/*       S.D.G.       */

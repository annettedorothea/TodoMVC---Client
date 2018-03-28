import Event from "../../../gen/ace/Event";

export default class AbstractInitOpenEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.InitOpenEvent');
    }
}

/*       S.D.G.       */

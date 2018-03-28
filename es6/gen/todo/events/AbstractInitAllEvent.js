import Event from "../../../gen/ace/Event";

export default class AbstractInitAllEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.InitAllEvent');
    }
}

/*       S.D.G.       */

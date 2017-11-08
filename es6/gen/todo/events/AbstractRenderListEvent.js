import Event from "../../../gen/ace/Event";

export default class AbstractRenderListEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.RenderListEvent');
    }
}

/*       S.D.G.       */

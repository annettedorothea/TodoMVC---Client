import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractInitDoneEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.InitDoneEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.FooterView.initFilter" ];
	}
}


/*       S.D.G.       */

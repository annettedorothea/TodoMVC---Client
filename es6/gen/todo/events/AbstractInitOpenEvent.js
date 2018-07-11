import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractInitOpenEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.InitOpenEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.FooterView.initFilter" ];
	}
}


/*       S.D.G.       */

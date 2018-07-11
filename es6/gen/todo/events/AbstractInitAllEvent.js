import Event from "../../../gen/ace/SynchronousEvent";

export default class AbstractInitAllEvent extends Event {
    constructor(eventData) {
        super(eventData, 'todo.InitAllEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.FooterView.initFilter" ];
	}
}


/*       S.D.G.       */

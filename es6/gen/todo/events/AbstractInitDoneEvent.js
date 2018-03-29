import Event from "../../../gen/ace/Event";

export default class AbstractInitDoneEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.InitDoneEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.FooterView.initFilter" ];
	}
}


/*       S.D.G.       */

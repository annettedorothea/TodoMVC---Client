import Event from "../../../gen/ace/Event";

export default class AbstractInitAllEvent extends Event {
    constructor(eventParam) {
        super(eventParam, 'todo.InitAllEvent');
    }
	getNotifiedListeners() {
	    return [ "todo.views.FooterView.initFilter" ];
	}
}


/*       S.D.G.       */

import AbstractToggleAllOkEvent from "../../../gen/todo/events/AbstractToggleAllOkEvent";

export default class ToggleAllOkEvent extends AbstractToggleAllOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

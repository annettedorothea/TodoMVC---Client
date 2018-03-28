import AbstractClearDoneOkEvent from "../../../gen/todo/events/AbstractClearDoneOkEvent";

export default class ClearDoneOkEvent extends AbstractClearDoneOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

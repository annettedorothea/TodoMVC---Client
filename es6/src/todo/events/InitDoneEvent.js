import AbstractInitDoneEvent from "../../../gen/todo/events/AbstractInitDoneEvent";

export default class InitDoneEvent extends AbstractInitDoneEvent {
    prepareDataForView() {
        this.eventData = Object.assign({}, this.eventParam);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

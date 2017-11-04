import AbstractInitFilterEvent from "../../../gen/app/todo/events/AbstractInitFilterEvent";

export default class InitFilterEvent extends AbstractInitFilterEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

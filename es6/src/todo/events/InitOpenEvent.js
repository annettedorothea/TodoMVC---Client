import AbstractInitOpenEvent from "../../../gen/todo/events/AbstractInitOpenEvent";

export default class InitOpenEvent extends AbstractInitOpenEvent {
    prepareDataForView() {
        this.eventData = Object.assign({}, this.eventParam);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

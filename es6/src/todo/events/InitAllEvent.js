import AbstractInitAllEvent from "../../../gen/todo/events/AbstractInitAllEvent";

export default class InitAllEvent extends AbstractInitAllEvent {
    prepareDataForView() {
        this.eventData = Object.assign({}, this.eventParam);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

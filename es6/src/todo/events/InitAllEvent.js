import AbstractInitAllEvent from "../../../gen/todo/events/AbstractInitAllEvent";
import AppUtils from "../../app/AppUtils";

export default class InitAllEvent extends AbstractInitAllEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

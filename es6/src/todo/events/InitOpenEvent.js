import AbstractInitOpenEvent from "../../../gen/todo/events/AbstractInitOpenEvent";
import AppUtils from "../../app/AppUtils";

export default class InitOpenEvent extends AbstractInitOpenEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */

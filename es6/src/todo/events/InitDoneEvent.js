import AbstractInitDoneEvent from "../../../gen/todo/events/AbstractInitDoneEvent";
import AppUtils from "../../app/AppUtils";

export default class InitDoneEvent extends AbstractInitDoneEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
